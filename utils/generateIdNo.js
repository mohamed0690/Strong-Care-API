export const generateUniqueIdentificationNo = async (Model, Identification) => {
  const minValue = 1000000000;
  const maxValue = 9999999999;
  while (true) {
    const randomValue = Math.floor(
      Math.random() * (maxValue - minValue + 1) + minValue
    );
    const existing = await Model.findOne({
      Identification: randomValue.toString(),
    });
    if (!existing) {
      return randomValue.toString().padStart(10, "0");
    }
  }
};
