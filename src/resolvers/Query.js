const feed = async (parent, args, context) => {
  const links = await context.prisma.link.findMany();
  return links;
};

export default feed;
