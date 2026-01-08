export const getFilesFromTransferItems = (dataTransfer: DataTransfer): File[] => {
  return [...dataTransfer.items].flatMap((item) => {
    if (!(item.kind === "file" && item.webkitGetAsEntry()?.name.endsWith(".har"))) {
      return [];
    }

    const file = item.getAsFile();
    if (!(file instanceof File)) {
      return [];
    }

    return [file];
  });
};
