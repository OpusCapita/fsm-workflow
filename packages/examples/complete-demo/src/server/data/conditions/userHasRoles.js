const condition = args => {
  // console.log(`\n\ncondition "userHasRoles" executed with \n${JSON.stringify(args)}\n\n`)
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
