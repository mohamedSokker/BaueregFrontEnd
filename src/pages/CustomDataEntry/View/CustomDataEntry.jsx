import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavContext } from "../../../contexts/NavContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import PageLoading from "../../../components/PageLoading";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

const sortByKey = (array, key) => {
  return array?.sort((a, b) => {
    const valA = a[key];
    const valB = b[key];
    if (valA == null) return 1;
    if (valB == null) return -1;
    if (typeof valA === "number" && typeof valB === "number") {
      return valA - valB;
    }
    if (valA instanceof Date || !isNaN(Date.parse(valA))) {
      return new Date(valA) - new Date(valB);
    }
    return String(valA).localeCompare(String(valB));
  });
};

const CustomDataEntry = () => {
  const { closeSmallSidebar, usersData } = useNavContext();
  const axiosPrivate = useAxiosPrivate();
  const [DBdata, setDBData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Groups
  const [groups, setGroups] = useState([]);
  const [groupNameInput, setGroupNameInput] = useState("");
  const [expandedGroups, setExpandedGroups] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Confirmation modal
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null); // 'group' or 'file'
  const [targetId, setTargetId] = useState(null);
  const [targetGroupId, setTargetGroupId] = useState(null);

  // Sidebar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const savedGroups = localStorage.getItem("customDataEntryGroups");
    const savedExpanded = localStorage.getItem("customDataEntryGroupExpanded");
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups));
    } else {
      setGroups([
        { id: "group-1", name: "Group 1", items: [] },
        { id: "group-2", name: "Group 2", items: [] },
      ]);
    }
    if (savedExpanded) {
      setExpandedGroups(JSON.parse(savedExpanded));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("customDataEntryGroups", JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem(
      "customDataEntryGroupExpanded",
      JSON.stringify(expandedGroups)
    );
  }, [expandedGroups]);

  // Fetch data
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const url = `/api/v3/ManageDataEntry`;
        const response = await axiosPrivate(url, { method: "GET" });
        const parsedData = response.data.map((item) => ({
          ...item,
          Users: item.Users ? JSON.parse(item.Users) : [],
        }));
        const sortedData = sortByKey(parsedData, "Name");
        setDBData(sortedData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const canAccessCategory = (category) => {
    const isAdmin = usersData[0]?.roles.Admin;
    const isEditorOrUser =
      usersData[0]?.roles?.Editor?.CustomDataEntry ||
      usersData[0]?.roles?.User?.CustomDataEntry;
    const hasAccessToCategory = category.Users?.includes(
      usersData[0]?.username
    );
    return isAdmin || (isEditorOrUser && hasAccessToCategory);
  };

  // Drag Start
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
    setDraggedItem(item.ID);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  // Allow drop
  const handleDragOver = (e) => {
    e.preventDefault(); // Required for drop
  };

  // Drop into group
  const handleDrop = (e, groupId) => {
    e.preventDefault();
    const droppedItem = JSON.parse(e.dataTransfer.getData("item"));

    // Remove from all other groups
    const updatedGroups = groups.map((group) => ({
      ...group,
      items: group.items.filter((i) => i.ID !== droppedItem.ID),
    }));

    // Add to target group
    const targetGroup = updatedGroups.find((g) => g.id === groupId);
    if (targetGroup) {
      targetGroup.items.push(droppedItem);
    }

    setGroups([...updatedGroups]);
  };

  // Create new group
  const createNewGroup = () => {
    if (!groupNameInput.trim()) return;
    const newGroup = {
      id: `group-${Date.now()}`,
      name: groupNameInput.trim(),
      items: [],
    };
    setGroups([...groups, newGroup]);
    setGroupNameInput("");
  };

  // Show confirmation modal
  const confirmDeleteGroup = (groupId) => {
    setModalAction("group");
    setTargetId(groupId);
    setShowModal(true);
  };

  const confirmRemoveFile = (itemId, groupId) => {
    setModalAction("file");
    setTargetId(itemId);
    setTargetGroupId(groupId);
    setShowModal(true);
  };

  // Handle deletion
  const handleConfirm = () => {
    if (modalAction === "group") {
      setGroups(groups.filter((g) => g.id !== targetId));
      setExpandedGroups((prev) => {
        const newState = { ...prev };
        delete newState[targetId];
        return newState;
      });
    } else if (modalAction === "file") {
      const updatedGroups = groups.map((group) => {
        if (group.id === targetGroupId) {
          return {
            ...group,
            items: group.items.filter((item) => item.ID !== targetId),
          };
        }
        return group;
      });
      setGroups(updatedGroups);
    }
    setShowModal(false);
    setTargetId(null);
    setTargetGroupId(null);
    setModalAction(null);
  };

  // Toggle expand
  const toggleGroup = (groupId) => {
    setExpandedGroups({
      ...expandedGroups,
      [groupId]: !expandedGroups[groupId],
    });
  };

  // Get unassigned cards
  const getUnassignedCards = () => {
    if (!DBdata) return [];
    return DBdata.filter(
      (card) =>
        canAccessCategory(card) &&
        !groups.some((group) => group.items.some((item) => item.ID === card.ID))
    );
  };

  // Filter groups and files by search term
  const filteredGroups = groups
    .map((group) => {
      const filteredItems = group.items.filter((item) =>
        item.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return {
        ...group,
        items: filteredItems,
      };
    })
    .filter(
      (group) =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.items.length > 0
    );

  return (
    <div className="flex w-full min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed overflow-y-auto top-[40px] left-0 h-[calc(100%-40px)] w-64 bg-gray-800 text-white p-4 space-y-2 z-40 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-lg font-bold mb-4">Folders</h2>
        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search folders or files..."
          className="w-full px-2 py-1 mb-4 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Group List */}
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <div key={group.id} className="space-y-1">
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-gray-700 p-2 rounded"
                onClick={() => toggleGroup(group.id)}
              >
                <div className="flex items-center gap-2">
                  {expandedGroups[group.id] ? "📂" : "📁"}
                  <span>{group.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmDeleteGroup(group.id);
                  }}
                  className="text-red-400 hover:text-red-200 text-sm"
                >
                  ❌
                </button>
              </div>
              {expandedGroups[group.id] && (
                <div
                  className="ml-6 space-y-1 border-l border-gray-600 pl-2 min-h-[10px]"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, group.id)}
                >
                  {group.items.length > 0 ? (
                    group.items.map((item) => (
                      <div
                        key={item.ID}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item)}
                        onDragEnd={handleDragEnd}
                        className={`py-1 px-2 hover:bg-gray-700 rounded flex items-center gap-2 text-sm transition-transform duration-200 ${
                          draggedItem === item.ID ? "scale-90 opacity-70" : ""
                        }`}
                      >
                        <span>📄</span>
                        <Link
                          to={`/CustomDataEntry/${item.ID}`}
                          className="overflow-ellipsis whitespace-nowrap overflow-hidden flex-1"
                        >
                          <TooltipComponent
                            position="TopCenter"
                            content={item.Name}
                          >
                            <p className="overflow-ellipsis whitespace-nowrap overflow-hidden">
                              {item.Name}
                            </p>
                          </TooltipComponent>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmRemoveFile(item.ID, group.id);
                          }}
                          className="text-xs text-red-400 hover:text-red-200"
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic">Empty</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 italic">No matching results</p>
        )}

        {/* New Group Form */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <input
            type="text"
            value={groupNameInput}
            onChange={(e) => setGroupNameInput(e.target.value)}
            placeholder="Folder name"
            className="w-full px-2 py-1 text-sm rounded bg-gray-700 focus:outline-none"
          />
          <button
            onClick={createNewGroup}
            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 rounded"
          >
            Create Folder
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-0 left-0 z-50 bg-transparent text-white p-[6px] rounded "
        >
          {isSidebarOpen ? "⬅️" : "📁"}
        </button>

        <div
          className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6 md:p-10 transition-colors duration-300"
          onClick={() => {
            closeSmallSidebar();
            setIsSidebarOpen(false);
          }}
        >
          {isLoading && <PageLoading message={`Loading Data...`} />}
          <h1 className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Choose a Category
          </h1>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "unassigned")}
          >
            {getUnassignedCards()
              .filter((card) =>
                card.Name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item) => (
                <Link
                  key={item.ID}
                  to={`/CustomDataEntry/${item.ID}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragEnd={handleDragEnd}
                  className={`group relative overflow-hidden rounded-xl backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 cursor-move block no-underline ${
                    draggedItem === item.ID ? "scale-90" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 rounded-xl"></div>
                  <div className="p-6 z-10 relative">
                    <TooltipComponent position="TopCenter" content={item.Name}>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors duration-300 overflow-ellipsis whitespace-nowrap overflow-hidden">
                        {item.Name}
                      </h2>
                    </TooltipComponent>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Click to manage data entries
                    </p>
                    <div className="mt-4 flex justify-end">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                        View
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          {!getUnassignedCards().length && !DBdata?.some(canAccessCategory) && (
            <div className="text-center mt-10">
              <p className="text-lg text-gray-600 dark:text-gray-400 italic">
                No accessible categories found.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-md w-full animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              {modalAction === "group" ? "Delete Folder" : "Remove File"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {modalAction === "group"
                ? "Are you sure you want to delete this folder? This action cannot be undone."
                : "Are you sure you want to remove this file from the folder?"}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDataEntry;
