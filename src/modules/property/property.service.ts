import { PropertyWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IPropertyQuery } from "./property.validation";

const getAllProperty = async (query: IPropertyQuery) => {
  const {
    searchTerm,
    location,
    title,
    amenities,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
  } = query;


  const andCondition: PropertyWhereInput[] = [];

  if (searchTerm) {
    andCondition.push({
      OR: [
        { title: { contains: searchTerm, mode: "insensitive" } },
        { location: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
        { amenities: { contains: searchTerm, mode: "insensitive" } },
      ],
    });
  }

  if (minPrice) {
    andCondition.push({
      price: {
        gte: Number(minPrice),
      },
    });
  }

  if (maxPrice) {
    andCondition.push({
      price: {
        lte: Number(maxPrice),
      },
    });
  }

  if(location){
    andCondition.push({
      location
    })
  }
  if(amenities){
    andCondition.push({
      amenities
    })
  }
  if(title){
    andCondition.push({
      title
    })
  }

  andCondition.push({
    status:'AVAILABLE'
  })

  const result = await prisma.property.findMany({
    where: {
      AND: andCondition,
    },
    orderBy:{
      [sortBy as string] : sortOrder
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  return result;
};

const getPropertyById = async (propertyId: string) => {
  const result = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    include: {
      landlord:{
        select:{
          id:true,
          name:true,
          email:true,
          profilePhoto:true,
          bio:true
        }
      },
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

export const propertyService = {
  getAllProperty,
  getPropertyById,
};
