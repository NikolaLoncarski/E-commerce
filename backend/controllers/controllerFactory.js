const createItem = asyncHandler(async (req, res, next) => {
  const { brand, model } = req.body;

  const ItemExist = await Item.findOne({ brand, model });

  if (ItemExist) {
    res.status(400);
    throw new Error("Item allready exists");
  } else {
    const item = await Item.create(req.body);

    res.status(201).json({
      status: "sucess",
      item,
    });
  }
});

const getItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).select("-__v");

  if (!item) {
    res.status(404);
    throw new Error("No item matches that id");
  }

  res.status(200).json({
    status: "sucess",
    item,
  });
});

const deleteItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findByIdAndDelete(req.params.id).select("-__v");

  if (!item) {
    res.status(404);
    throw new Error("No item matches that id");
  }

  res.status(200).json({
    status: "sucess",
    item: null,
  });
});

const updateItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).select("-__v");

  if (!item) {
    res.status(404);
    throw new Error("No item matches that id");
  }

  res.status(200).json({
    status: "sucess",
    item,
  });
});

const getAllItems = asyncHandler(async (req, res, next) => {
  const items = await Item.find().select("-__v");

  res.status(200).json({
    status: "sucess",
    items,
  });
});

export { createItem, getItem, deleteItem, updateItem, getAllItems };
