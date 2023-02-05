/**
 * @generated SignedSource<<37f0994cc1540479130b567375fb1f20>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "milestoneIds"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "moduleTypes"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "searchText"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "seriesIds"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "milestoneIds",
    "variableName": "milestoneIds"
  },
  {
    "kind": "Variable",
    "name": "moduleTypes",
    "variableName": "moduleTypes"
  },
  {
    "kind": "Variable",
    "name": "searchText",
    "variableName": "searchText"
  },
  {
    "kind": "Variable",
    "name": "seriesIds",
    "variableName": "seriesIds"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ModuleListDataRefetchQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "SelectWithSearchPOC_modules"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ModuleListDataRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ModuleQuery",
        "kind": "LinkedField",
        "name": "module",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "ModuleList",
            "kind": "LinkedField",
            "name": "listModules",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ModuleEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Module",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "type",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Series",
                        "kind": "LinkedField",
                        "name": "parentList",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "filters": [
              "searchText",
              "seriesIds",
              "milestoneIds",
              "moduleTypes"
            ],
            "handle": "connection",
            "key": "ModuleListData_listModules",
            "kind": "LinkedHandle",
            "name": "listModules"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "742c0767f7de1b3f70a8fb4c2e6857a1",
    "id": null,
    "metadata": {},
    "name": "ModuleListDataRefetchQuery",
    "operationKind": "query",
    "text": "query ModuleListDataRefetchQuery(\n  $after: ID\n  $first: Int\n  $milestoneIds: [ID!]\n  $moduleTypes: [ModuleType!]\n  $searchText: String\n  $seriesIds: [ID!]\n) {\n  ...SelectWithSearchPOC_modules_38reyY\n}\n\nfragment SelectWithSearchPOC_modules_38reyY on Query {\n  module {\n    listModules(first: $first, after: $after, searchText: $searchText, seriesIds: $seriesIds, milestoneIds: $milestoneIds, moduleTypes: $moduleTypes) {\n      edges {\n        node {\n          id\n          name\n          type\n          parentList {\n            id\n            name\n          }\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n"
  }
};
})();

node.hash = "5d56fd793aab7e833197df767100f9e2";

module.exports = node;
