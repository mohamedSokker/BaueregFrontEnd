export function determineRelationshipsAmongTables(tables, columns) {
  //   console.log(tables);
  if (tables.length < 2) return;
  // Helper function to count occurrences of values in an array
  const countOccurrences = (array, value) =>
    array.filter((v) => v === value).length;

  // Helper function to determine relationship between two tables
  function determineRelationship(tableA, tableB) {
    // console.log(Object.keys(tableA[0]));
    // console.log(Object.keys(tableB[0]));
    // Find all keys in both tables
    const keysA = Object.keys(tableA[0] || {}).filter(
      (el) => el !== "ID" && columns.includes(el)
    );
    const keysB = Object.keys(tableB[0] || {}).filter(
      (el) => el !== "ID" && columns.includes(el)
    );

    // Identify shared keys (keys that exist in both tables)
    const sharedKeys = keysA.filter((key) => keysB.includes(key));

    if (sharedKeys.length === 0) {
      return null; // No shared keys, so no relationship
    }

    // Analyze each shared key to determine the relationship
    for (const sharedKey of sharedKeys) {
      // Extract values for the shared key from both tables
      const valuesInA = tableA.map((record) => record[sharedKey]);
      const valuesInB = tableB.map((record) => record[sharedKey]);

      // Check if all values in A are unique
      const isUniqueInA = new Set(valuesInA).size === valuesInA.length;

      // Check if all values in B are unique
      const isUniqueInB = new Set(valuesInB).size === valuesInB.length;

      // Check if every value in A appears at most once in B
      const isOneToOneFromAToB = valuesInA.every(
        (value) => countOccurrences(valuesInB, value) <= 1
      );

      // Check if every value in B appears at most once in A
      const isOneToOneFromBToA = valuesInB.every(
        (value) => countOccurrences(valuesInA, value) <= 1
      );

      // Determine the relationship type
      if (isOneToOneFromAToB && isOneToOneFromBToA) {
        return `One-to-One (via '${sharedKey}')`;
      } else if (isOneToOneFromAToB) {
        return `One-to-Many (Table A → Table B via '${sharedKey}')`;
      } else if (isOneToOneFromBToA) {
        return `One-to-Many (Table B → Table A via '${sharedKey}')`;
      } else {
        return `Many-to-Many (via '${sharedKey}')`;
      }
    }

    return null; // No valid relationship found
  }

  // Store relationships in a result object
  const relationships = [];

  // Analyze all pairs of tables
  for (let i = 0; i < tables.length; i++) {
    for (let j = i + 1; j < tables.length; j++) {
      const tableA = tables[i];
      const tableB = tables[j];

      const relationship = determineRelationship(tableA, tableB);
      if (relationship) {
        relationships.push({
          tables: [i, j],
          relationship: relationship,
        });
      }
    }
  }

  // Detect join tables for many-to-many relationships
  const joinTables = [];
  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const keys = Object.keys(table[0] || {});

    // A join table typically has exactly two foreign keys
    if (keys.length === 2) {
      const key1 = keys[0];
      const key2 = keys[1];

      // Check if these keys reference other tables
      let referencesOtherTables = false;
      for (let j = 0; j < tables.length; j++) {
        if (j === i) continue;

        const otherTable = tables[j];
        const otherKeys = Object.keys(otherTable[0] || {});

        if (otherKeys.includes(key1) || otherKeys.includes(key2)) {
          referencesOtherTables = true;
          break;
        }
      }

      if (referencesOtherTables) {
        joinTables.push({
          tableIndex: i,
          keys: keys,
        });
      }
    }
  }

  // Return results
  return {
    pairwiseRelationships: relationships,
    joinTables: joinTables,
  };
}
