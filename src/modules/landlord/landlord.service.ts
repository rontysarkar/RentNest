import { RentalRequestStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import {
  TCreatePropertyPayload,
  TUpdatePropertyPayload,
} from "./landlord.validation";

const createProperty = async (
  landlordId: string,
  payload: TCreatePropertyPayload,
) => {
  const property = await prisma.property.create({
    data: {
      ...payload,
      landlordId,
    },
  });

  return property;
};

const updateProperty = async (
  landlordId: string,
  propertyId: string,
  payload: TUpdatePropertyPayload,
) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new Error("Property Not Found");
  }

  if (property.landlordId !== landlordId) {
    throw new Error("You Cannot Update this property");
  }

  const updatedProperty = await prisma.property.update({
    where: {
      id: propertyId,
    },
    data: {
      ...payload,
    },
  });

  return updatedProperty;
};

const deletePropertyById = async (landlordId: string, propertyId: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new Error("Property Not Found");
  }

  if (property.landlordId !== landlordId) {
    throw new Error("You Cannot delete this property");
  }

  const deletedData = await prisma.property.delete({
    where: {
      id: propertyId,
      landlordId,
    },
  });

  return deletedData;
};

const getPropertyByLandlordById = async (propertyId: string,landlordId:string) => {
  const result = await prisma.property.findUnique({
    where: {
      id: propertyId,
      landlordId
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  if (!result) {
    throw new Error("Property Not Found");
  }

  return result;
};

const getAllPropertyByLandlord = async (landlordId:string) => {
  const result = await prisma.property.findMany({
    where:{
      landlordId
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return result;
};

const getRequestsByLandlordId = async (landlordId: string) => {
  const result = await prisma.rentalRequest.findMany({
    where: {
      property: {
        landlordId,
      },
    },
  });

  return result;
};

const approveOrRejectRequest = async (
  landlordId: string,
  requestId: string,
  status: RentalRequestStatus,
) => {
  const request = await prisma.rentalRequest.findUnique({
    where: {
      id: requestId,
    },
    include: {
      property: {
        select: {
          landlordId: true,
        },
      },
    },
  });

  if (!request) {
    throw new Error("Rental Request Not Found");
  }

  if (landlordId !== request.property.landlordId) {
    throw new Error("You are cannot change the rental request status");
  }

  if (request.status !== "PENDING") {
    throw new Error(`Already ${request.status} this rental request`);
  }

  const statusUpdate = await prisma.rentalRequest.update({
    where: {
      id: requestId,
    },
    data: {
      status,
    },
  });
  return statusUpdate;
};

export const landlordService = {
  createProperty,
  updateProperty,
  deletePropertyById,
  getPropertyByLandlordById,
  getAllPropertyByLandlord,
  getRequestsByLandlordId,
  approveOrRejectRequest,
};
