// Stage 2 content source. Every fact comes from CV_.pdf or items the owner confirmed on 2026-10-18.
// shortcut: static seed instead of Supabase, replace with database queries in Stage 3.
import type { Certification, Education, Experience, Profile, Project, SkillGroup } from "./types";

export const profile: Profile = {
  name: "Nafis Islam Nitol",
  headline:
    "Electrical engineering student building robots, drones and the control systems that keep them on course.",
  about:
    "I study Electrical Engineering at the University of Pécs in Hungary. My work so far has been hands-on: an autonomous drone, a PID line-following robot, a competition soccer bot and a smart dwelling model. Along the way I’ve worked with embedded programming, sensor integration, C++, Arduino, ESP8266 and CAD. I want to build a career in robotics and automation, where software, electronics and control systems meet.",
  interests: ["Robotics", "Automation", "Embedded systems", "Control systems"],
  email: "nafisislamnitol@gmail.com",
  githubUrl: "https://github.com/Nafis000",
  cvUrl: "/cv/nafis-islam-nitol-cv.pdf",
  portrait: { src: "/images/nafis-portrait.webp", alt: "Nafis Islam Nitol standing in front of a wall of climbing plants" },
  languages: "English: C2 listening and reading, C1 speaking and writing (IELTS 7.5)",
};

export const projects: Project[] = [
  {
    slug: "line-following-robot",
    title: "Line Following Robot",
    category: "Control systems",
    summary: "An autonomous robot that holds a black line through sharp turns, steered by a PID loop on an Arduino Nano.",
    status: "completed", // CV: "designed and implemented a fully functional autonomous robot"
    problem:
      "Build a fast robot that follows a complex black line on a white surface without losing its trajectory on sharp turns.",
    approach:
      "A PID controller runs on the Arduino Nano. It reads the error from the IR sensor array and adjusts each motor's speed continuously, so the robot corrects its path smoothly instead of zig-zagging.",
    hardware: ["Arduino Nano", "IR sensor array (QTR-8RC)", "L298N motor driver", "HC-SR04 sonar"],
    software: ["C++", "PID control"],
    image: {
      src: "/images/projects/line-follower.webp",
      alt: "The line following robot on a desk: a low black chassis with an Arduino Nano, motor driver and coloured jumper wires",
      width: 486,
      height: 244,
    },
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "quadobot-autonomous-drone",
    title: "QuadoBot",
    category: "Aerial robotics",
    summary: "A fully functional autonomous drone with gyroscope and GPS integration, fire sensors and an FPV camera.",
    status: "completed", // CV: "designed and implemented a fully functional autonomous drone system"
    hardware: ["Flight controller", "Brushless motors", "Gyroscope", "GPS module", "Fire sensors", "FPV camera"],
    software: [],
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "soccer-bot",
    title: "Soccer Bot",
    category: "Competition robotics",
    summary: "A remote-controlled, heavily shielded soccer robot built for competitions, with high torque and quick handling.",
    status: "completed", // CV: "built a ... soccer bot for competitions"
    problem:
      "Give the robot enough pushing power to move the ball and hold its ground, while keeping it agile and responsive.",
    approach:
      "A laser-cut stainless-steel frame carries high-torque gear motors and metal-rim wheels. The weight distribution was tuned for traction, and a dual RC motor driver takes commands from the transmitter.",
    hardware: [
      "37GB 500 RPM gear motors",
      "65 mm metal-rim rubber wheels",
      "Laser-cut stainless-steel frame",
      "Dual RC motor driver",
      "2200 mAh 3S LiPo battery",
    ],
    software: [],
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "esp32-wifi-rover",
    title: "ESP32 Wi-Fi Rover",
    category: "IoT",
    summary: "A rover driven from any phone or laptop browser, with its connection status shown on an onboard OLED.",
    status: null,
    problem: "Build a low-latency, web-controlled vehicle that reports its own status.",
    approach:
      "The ESP32 hosts a web server with a control page. Commands arrive over WebSocket, and an SSD1306 OLED on I²C shows the connection status and IP address.",
    hardware: ["ESP32", "SSD1306 OLED (I²C)"],
    software: ["WebSocket", "Embedded web server"],
    featured: false,
    sortOrder: 4,
  },
  {
    slug: "smart-dwelling-model",
    title: "Smart Dwelling Model",
    category: "Home automation",
    summary: "A model home with a microcontroller and a network of sensors that automate it and manage its electrical loads.",
    status: "prototype", // CV: "smart dwelling model"
    hardware: ["Microcontroller", "Sensor network"],
    software: ["Load management", "User interface"],
    featured: false,
    sortOrder: 5,
  },
];

export const education: Education[] = [
  {
    institution: "University of Pécs",
    qualification: "BSc Electrical Engineering",
    location: "Pécs, Hungary",
    start: "2025-09",
    end: null,
    note: "Stipendium Hungaricum scholar",
  },
  {
    institution: "University of Asia Pacific",
    qualification: "BSc Computer Science and Engineering",
    location: "Dhaka, Bangladesh",
    start: "2024-07",
    end: "2025-06",
    grade: "CGPA 3.94 / 4.00",
  },
  {
    institution: "Shaheed Police Smrity College",
    qualification: "Higher Secondary Certificate",
    location: "Dhaka, Bangladesh",
    start: "2020-07",
    end: "2022-10",
    grade: "GPA 5.00",
  },
  {
    institution: "Adarsha High School",
    qualification: "Secondary School Certificate",
    location: "Dhaka, Bangladesh",
    start: "2014-01",
    end: "2020-01",
    grade: "GPA 5.00",
  },
];

export const experience: Experience[] = [
  {
    organization: "Synergy Solutions",
    role: "Customer Relationship Officer",
    start: "2024-02",
    end: "2024-09",
    points: [
      "Managed customer communication and relationship support.",
      "Built coordination, problem-solving and professional communication skills.",
    ],
  },
];

export const certifications: Certification[] = [
  {
    title: "Advanced IoT System Design",
    issuer: "Coursera · University of California",
    year: "2024",
    description: "IoT architecture, sensor integration and cloud data processing with the ESP32.",
  },
  {
    title: "C++ Programming for Robotics",
    issuer: "Udemy",
    year: "2023",
    description: "Memory management, pointers and object-oriented programming for embedded systems.",
  },
  {
    title: "Arduino Fundamentals",
    issuer: "Arduino",
    year: "2022",
    description: "Digital I/O, PWM and serial communication protocols.",
  },
];

export const skills: SkillGroup[] = [
  {
    name: "Embedded & electronics",
    items: [
      { label: "Microcontroller programming" },
      { label: "Arduino" },
      { label: "ESP8266" },
      { label: "ESP32" },
      { label: "Sensor integration" },
      { label: "PID control" },
    ],
  },
  { name: "Programming", items: [{ label: "C++" }, { label: "Python", level: "basic" }, { label: "HTML / CSS" }] },
  {
    name: "Tools",
    items: [{ label: "CAD software" }, { label: "Word, Excel, PowerPoint", level: "intermediate" }],
  },
];
