import { FiUserPlus, FiUserMinus, FiUserCheck } from "react-icons/fi";
import { IoMdGrid } from "react-icons/io";
import { GiCrane, GiCargoCrane } from "react-icons/gi";
import { TbTransferIn } from "react-icons/tb";
import { TiShoppingCart } from "react-icons/ti";
import { SiLinuxcontainers } from "react-icons/si";
import { AiOutlineTable } from "react-icons/ai";
import { RiBookLine } from "react-icons/ri";
import { BsDatabaseAdd } from "react-icons/bs";
import { BiListPlus, BiTestTube } from "react-icons/bi";
import { BiLineChart } from "react-icons/bi";
import { MdOutlineFireTruck } from "react-icons/md";
import { Cookies } from "react-cookie";
import { dataEntry } from "./dataEntry";

import {
  EditTables,
  Equipments,
  Locations,
  Orders,
  Stocks,
  Dashboard,
  Catalogues,
  ManageUsers,
  ManageAppUsers,
  ManageKanban,
  OilSamples,
  OilSamplesAnalyzed,
  DataEntry,
} from "../pages";
import Transportaions from "../pages/Transportaions";

const cookies = new Cookies();
const token = cookies?.get("token");

export const allDataTitles = [
  "Dashboard",
  "DataEntry",
  "DataEntrySites",
  "Kanban",
  "Transportations",
  "Sites",
  "Equipments",
  "Orders",
  "Stocks",
  "StocksList",
  "Tables",
  "Catalogues",
  "OilSamples",
  "OilSamplesAnalyzed",
  "ManageUsers",
  "ManageAppUsers",
];

export const links = [
  {
    title: "Dashboard",
    name: "Dashboard",
    dest: "/dashboard",
    elem: <Dashboard />,
    icon: <BiLineChart size={20} />,
  },
  {
    title: "Task Manager",
    name: "Kanban",
    dest: "/kanban",
    elem: <ManageKanban />,
    icon: <BiListPlus size={20} />,
  },
  {
    title: "Transportations",
    name: "Transportations",
    dest: "/Transportations",
    elem: <Transportaions />,
    icon: <MdOutlineFireTruck size={20} />,
  },
  {
    title: "Sites",
    name: "Sites",
    dest: "/sites",
    elem: <Locations />,
    icon: <GiCrane size={20} />,
    data: [],
  },
  {
    title: "Equipments",
    name: "Equipments",
    dest: "/equipments",
    elem: <Equipments />,
    icon: <GiCargoCrane size={20} />,
    data: [],
  },
  {
    title: "Orders",
    name: "Orders",
    dest: "/orders",
    elem: <Orders />,
    icon: <TiShoppingCart size={20} />,
    data: [],
  },
  {
    title: "Stocks",
    name: "Stocks",
    dest: "/stocks",
    elem: <Stocks />,
    icon: <SiLinuxcontainers size={20} />,
    data: [],
  },
  {
    title: "Tables",
    name: "Tables",
    dest: "/Tables",
    elem: <EditTables />,
    icon: <AiOutlineTable size={20} />,
    data: [],
  },
  {
    title: "Data Entry",
    name: "DataEntry",
    dest: "/DataEntry",
    elem: <DataEntry />,
    icon: <BsDatabaseAdd size={20} />,
    data: dataEntry,
  },
  {
    title: "Catalogues",
    name: "Catalogues",
    dest: "/catalogues",
    elem: <Catalogues />,
    icon: <RiBookLine size={20} />,
    data: [],
  },
  {
    title: "Oil Samples",
    name: "OilSamples",
    dest: "/OilSamples",
    elem: <OilSamples />,
    icon: <BiTestTube size={20} />,
  },
  {
    title: "Oil Samples Analyzed",
    name: "OilSamplesAnalyzed",
    dest: "/OilSamplesAnalyzed",
    elem: <OilSamplesAnalyzed />,
    icon: <BiTestTube size={20} />,
  },
  {
    title: "Manage Users",
    name: "ManageUsers",
    dest: "/ManageUsers",
    elem: <ManageUsers />,
    icon: <FiUserCheck size={20} />,
    data: [
      {
        name: "Add User",
        dest: "/AddUser",
        icon: <FiUserPlus size={16} />,
      },
      {
        name: "Edit User",
        dest: "/EditUser",
        icon: <FiUserCheck size={16} />,
      },
      {
        name: "Delete User",
        dest: "/DeleteUser",
        icon: <FiUserMinus size={16} />,
      },
    ],
  },
  {
    title: "Manage App Users",
    name: "ManageAppUsers",
    dest: "/ManageAppUsers",
    elem: <ManageAppUsers />,
    icon: <FiUserCheck size={20} />,
    data: [
      {
        name: "Add User",
        dest: "/AddAppUser",
        icon: <FiUserPlus size={16} />,
      },
      {
        name: "Edit User",
        dest: "/EditAppUser",
        icon: <FiUserCheck size={16} />,
      },
      {
        name: "Delete User",
        dest: "/DeleteAppUser",
        icon: <FiUserMinus size={16} />,
      },
    ],
  },
];

export const AllStocks = [
  "Main",
  "Store20",
  "Store1",
  "Store10",
  "Store11",
  "Store12",
  "Store13",
  "Store14",
  "Store15",
  "Store16",
  "Store17",
  "Store18",
  "Store19",
  "Store2",
  "Store21",
  "Store22",
  "Store23",
  "Store24",
  "Store25",
  "Store26",
  "Store27",
  "Store28",
  "Store29",
  "Store3",
  "Store30",
  "Store31",
  "Store32",
  "Store4",
  "Store5",
  "Store6",
  "Store7",
  "Store8",
  "Store9",
  "TransitMain",
  "TransitStore1",
  "TransitStore10",
  "TransitStore12",
  "TransitStore13",
  "TransitStore14",
  "TransitStore15",
  "TransitStore16",
  "TransitStore17",
  "TransitStore18",
  "TransitStore19",
  "TransitStore2",
  "TransitStore20",
  "TransitStore21",
  "TransitStore22",
  "TransitStore23",
  "TransitStore24",
  "TransitStore25",
  "TransitStore26",
  "TransitStore27",
  "TransitStore28",
  "TransitStore29",
  "TransitStore3",
  "TransitStore30",
  "TransitStore31",
  "TransitStore32",
  "TransitStore4",
  "TransitStore6",
  "TransitStore7",
  "TransitStore9",
  "Transit",
  "Tashghilat_Elnasser",
];
