-- CreateTable
CREATE TABLE "node" (
    "nodeID" TEXT NOT NULL,
    "xcoord" INTEGER NOT NULL,
    "ycoord" INTEGER NOT NULL,
    "floor" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "nodeType" TEXT NOT NULL,
    "longName" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "edges" TEXT NOT NULL,
    "blocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "node_pkey" PRIMARY KEY ("nodeID")
);

-- CreateTable
CREATE TABLE "edge" (
    "edgeID" TEXT NOT NULL,
    "startNodeID" TEXT NOT NULL,
    "endNodeID" TEXT NOT NULL,

    CONSTRAINT "edge_pkey" PRIMARY KEY ("edgeID")
);

-- CreateTable
CREATE TABLE "path" (
    "uniqueID" SERIAL NOT NULL,
    "startNodeID" TEXT NOT NULL,
    "endNodeID" TEXT NOT NULL,
    "nodes" TEXT NOT NULL,

    CONSTRAINT "path_pkey" PRIMARY KEY ("uniqueID")
);

-- CreateTable
CREATE TABLE "flower" (
    "id" SERIAL NOT NULL,
    "patientName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "cardMessage" TEXT NOT NULL,
    "flowerType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "flower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gift" (
    "id" SERIAL NOT NULL,
    "recipientName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "giftSize" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "wrapping" TEXT NOT NULL,

    CONSTRAINT "gift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interpreter" (
    "id" SERIAL NOT NULL,
    "clientName" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "additionalInfo" TEXT NOT NULL,

    CONSTRAINT "interpreter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security" (
    "id" SERIAL NOT NULL,
    "employeeName" TEXT NOT NULL,
    "employeeID" INTEGER NOT NULL,
    "reqPriority" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "requestType" TEXT NOT NULL,
    "reqStatus" TEXT NOT NULL,
    "alertAuthorities" BOOLEAN NOT NULL,

    CONSTRAINT "security_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicine" (
    "id" SERIAL NOT NULL,
    "patientName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "patientCondition" TEXT NOT NULL,
    "drugName" TEXT NOT NULL,
    "drugQuantity" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sanitation" (
    "id" SERIAL NOT NULL,
    "patientName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "additionalInfo" TEXT NOT NULL,

    CONSTRAINT "sanitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roomschedule" (
    "id" SERIAL NOT NULL,
    "employeeName" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,

    CONSTRAINT "roomschedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicaldevice" (
    "id" SERIAL NOT NULL,
    "employeeName" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "selectedDevice" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "withBalloons" BOOLEAN NOT NULL,

    CONSTRAINT "medicaldevice_pkey" PRIMARY KEY ("id")
);
