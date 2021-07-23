const links = async (parent, args, context) => {
  const response = await context.prisma.user.findUnique({ where: { id: parent.id } }).links();
  return response;
};

export default links;
