export const generateCourseAcronym = (courseName: string) => {
  const courseAcronym = courseName
    ?.split(" ")
    .map((word) =>
      word[0] && word[0] === word[0].toUpperCase() ? word[0] : "",
    )
    .join("");
  return courseAcronym;
};
