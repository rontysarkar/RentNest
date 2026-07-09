import { prisma } from "../../lib/prisma";


const getAllProperty = async () => {
  const result = await prisma.property.findMany({
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