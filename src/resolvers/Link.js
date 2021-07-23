function postedBy(parent, args, context) {
  const result = context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy();
  return result;
}

export default postedBy;
