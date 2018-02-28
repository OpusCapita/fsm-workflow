const condition = args => {
  console.log(`condition "userHasRoles" executed`);
  return true
}

condition.paramsSchema = {
  type: "object",
  properties: {
    restrictedRoles: {
      type: "array",
      items: {
        type: "string",
        enum: ["REV", "BOSS"]
      }
    }
  }
}

export default condition;
