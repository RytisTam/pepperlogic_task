export function convertSparklineToDateObjects(hourStrings:string[]) {
  const result = [];
  if (hourStrings) {
    const currentDate = new Date();
  
    for (let i = 0; i < hourStrings.length; i++) {
      const date = new Date(currentDate);
      date.setHours(currentDate.getHours() - (168 - i));
      const formattedDate = date.toISOString().slice(0, 16).replace('T', ' ');
  
      result.push({
        Date: formattedDate,
        Price: hourStrings[i]
      });
    }
  }
    return result;
  }