const test = async (req, res) => {
  try {
    var response = {
      code: 1,
      msg: "Hello from Shamli's Server",
    };
    res.send(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { test };
