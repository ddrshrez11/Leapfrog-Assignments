var yunip = {
  name: "Yunip Lal Shrestha",
  address: "Gwarko Height",
  emails: ["yunipshrestha@gmail.com", "yuniplal.074@kathford.edu.np"],
  interests: ["Programming", "Gaming", "Chelsea"],
  education: [
    {
      name: "United Academy",
      enrolledDate: "2014",
    },
    {
      name: "Kathford International College of Engineering & Management",
      enrolledDate: "2017",
    },
  ],
};

console.log(yunip);

yunip.education.forEach((edu_level) => {
  console.log("Name: ", edu_level.name, ", Date: ", edu_level.enrolledDate);
});
