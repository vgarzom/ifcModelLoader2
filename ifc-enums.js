var IfcRoleEnum = {
    "SUPPLIER": 0,
    "MANUFACTURER": 1,
    "CONTRACTOR": 2,
    "SUBCONTRACTOR": 3,
    "ARCHITECT": 4,
    "STRUCTURALENGINEER": 5,
    "COSTENGINEER": 6,
    "CLIENT": 7,
    "BUILDINGOWNER": 8,
    "BUILDINGOPERATOR": 9,
    "MECHANICALENGINEER": 10,
    "ELECTRICALENGINEER": 11,
    "PROJECTMANAGER": 12,
    "FACILITIESMANAGER": 13,
    "CIVILENGINEER": 14,
    "COMMISSIONINGENGINEER": 15,
    "ENGINEER": 16,
    "OWNER": 17,
    "CONSULTANT": 18,
    "CONSTRUCTIONMANAGER": 19,
    "FIELDCONSTRUCTIONMANAGER": 20,
    "RESELLER": 21,
    "USERDEFINED": 22
};

var IfcStateEnum = {
    "READWRITE": 1, //	Object is in a Read-Write state. It may be modified by an application.
    "READONLY": 2,//	Object is in a Read-Only state. It may be viewed but not modified by an application.
    "LOCKED": 3,//	Object is in a Locked state. It may not be accessed by an application.
    "READWRITELOCKED": 4,//	Object is in a Read-Write-Locked state. It may not be accessed by an application.
    "READONLYLOCKED": 5 //Object is in a Read-Only-Locked state. It may not be accessed by an application.
}