-- Initial published content. Every fact comes from CV_.pdf or items the owner confirmed on 2026-10-18.
-- Media (portrait, project photos, CV) still ship from /public and move to Storage with the CMS.

insert into public.profiles (id, name, headline, about, interests, location, languages, public_email, published)
values (
  1,
  'Nafis Islam Nitol',
  'Electrical engineering student building robots, drones and the control systems that keep them on course.',
  'I study Electrical Engineering at the University of Pécs in Hungary. My work so far has been hands-on: an autonomous drone, a PID line-following robot, a competition soccer bot and a smart dwelling model. Along the way I’ve worked with embedded programming, sensor integration, C++, Arduino, ESP8266 and CAD. I want to build a career in robotics and automation, where software, electronics and control systems meet.',
  array['Robotics', 'Automation', 'Embedded systems', 'Control systems'],
  'Pécs, Hungary',
  'English: C2 listening and reading, C1 speaking and writing (IELTS 7.5)',
  'nafisislamnitol@gmail.com',
  true
);

insert into public.education (institution, qualification, location, start_date, end_date, grade, note, sort_order, published) values
  ('University of Pécs', 'BSc Electrical Engineering', 'Pécs, Hungary', '2025-09-01', null, null, 'Stipendium Hungaricum scholar', 1, true),
  ('University of Asia Pacific', 'BSc Computer Science and Engineering', 'Dhaka, Bangladesh', '2024-07-01', '2025-06-30', 'CGPA 3.94 / 4.00', null, 2, true),
  ('Shaheed Police Smrity College', 'Higher Secondary Certificate', 'Dhaka, Bangladesh', '2020-07-01', '2022-10-30', 'GPA 5.00', null, 3, true),
  ('Adarsha High School', 'Secondary School Certificate', 'Dhaka, Bangladesh', '2014-01-01', '2020-01-31', 'GPA 5.00', null, 4, true);

insert into public.experience (organization, role, employment_type, start_date, end_date, responsibilities, sort_order, published) values
  ('Synergy Solutions', 'Customer Relationship Officer', 'employment', '2024-02-01', '2024-09-30',
   array['Managed customer communication and relationship support.',
         'Built coordination, problem-solving and professional communication skills.'], 1, true);

insert into public.projects (slug, title, category, summary, status, problem, approach, hardware, software, featured, sort_order, published) values
  ('line-following-robot', 'Line Following Robot', 'Control systems',
   'An autonomous robot that holds a black line through sharp turns, steered by a PID loop on an Arduino Nano.',
   'completed', -- CV: "designed and implemented a fully functional autonomous robot"
   'Build a fast robot that follows a complex black line on a white surface without losing its trajectory on sharp turns.',
   'A PID controller runs on the Arduino Nano. It reads the error from the IR sensor array and adjusts each motor''s speed continuously, so the robot corrects its path smoothly instead of zig-zagging.',
   array['Arduino Nano', 'IR sensor array (QTR-8RC)', 'L298N motor driver', 'HC-SR04 sonar'],
   array['C++', 'PID control'], true, 1, true),
  ('quadobot-autonomous-drone', 'QuadoBot', 'Aerial robotics',
   'A fully functional autonomous drone with gyroscope and GPS integration, fire sensors and an FPV camera.',
   'completed', -- CV: "designed and implemented a fully functional autonomous drone system"
   null, null,
   array['Flight controller', 'Brushless motors', 'Gyroscope', 'GPS module', 'Fire sensors', 'FPV camera'],
   '{}', true, 2, true),
  ('soccer-bot', 'Soccer Bot', 'Competition robotics',
   'A remote-controlled, heavily shielded soccer robot built for competitions, with high torque and quick handling.',
   'completed', -- CV: "built a ... soccer bot for competitions"
   'Give the robot enough pushing power to move the ball and hold its ground, while keeping it agile and responsive.',
   'A laser-cut stainless-steel frame carries high-torque gear motors and metal-rim wheels. The weight distribution was tuned for traction, and a dual RC motor driver takes commands from the transmitter.',
   array['37GB 500 RPM gear motors', '65 mm metal-rim rubber wheels', 'Laser-cut stainless-steel frame', 'Dual RC motor driver', '2200 mAh 3S LiPo battery'],
   '{}', true, 3, true),
  ('esp32-wifi-rover', 'ESP32 Wi-Fi Rover', 'IoT',
   'A rover driven from any phone or laptop browser, with its connection status shown on an onboard OLED.',
   null, -- not stated by the owner
   'Build a low-latency, web-controlled vehicle that reports its own status.',
   'The ESP32 hosts a web server with a control page. Commands arrive over WebSocket, and an SSD1306 OLED on I²C shows the connection status and IP address.',
   array['ESP32', 'SSD1306 OLED (I²C)'],
   array['WebSocket', 'Embedded web server'], false, 4, true),
  ('smart-dwelling-model', 'Smart Dwelling Model', 'Home automation',
   'A model home with a microcontroller and a network of sensors that automate it and manage its electrical loads.',
   'prototype', -- CV: "smart dwelling model"
   null, null,
   array['Microcontroller', 'Sensor network'],
   array['Load management', 'User interface'], false, 5, true);

insert into public.certifications (title, issuer, issued_year, kind, description, sort_order, published) values
  ('Advanced IoT System Design', 'Coursera · University of California', 2024, 'verified',
   'IoT architecture, sensor integration and cloud data processing with the ESP32.', 1, true),
  ('C++ Programming for Robotics', 'Udemy', 2023, 'verified',
   'Memory management, pointers and object-oriented programming for embedded systems.', 2, true),
  ('Arduino Fundamentals', 'Arduino', 2022, 'verified',
   'Digital I/O, PWM and serial communication protocols.', 3, true);

insert into public.skills (name, category, level, sort_order, published) values
  ('Microcontroller programming', 'Embedded & electronics', null, 1, true),
  ('Arduino', 'Embedded & electronics', null, 2, true),
  ('ESP8266', 'Embedded & electronics', null, 3, true),
  ('ESP32', 'Embedded & electronics', null, 4, true),
  ('Sensor integration', 'Embedded & electronics', null, 5, true),
  ('PID control', 'Embedded & electronics', null, 6, true),
  ('C++', 'Programming', null, 7, true),
  ('Python', 'Programming', 'basic', 8, true),
  ('HTML / CSS', 'Programming', null, 9, true),
  ('CAD software', 'Tools', null, 10, true),
  ('Word, Excel, PowerPoint', 'Tools', 'intermediate', 11, true);

insert into public.project_skills (project_id, skill_id)
select p.id, s.id from public.projects p join public.skills s on
  (p.slug = 'line-following-robot' and s.name in ('Arduino', 'C++', 'PID control', 'Sensor integration'))
  or (p.slug = 'esp32-wifi-rover' and s.name in ('ESP32', 'Microcontroller programming'));

insert into public.social_links (label, url, sort_order, published) values
  ('Email', 'mailto:nafisislamnitol@gmail.com', 1, true),
  ('GitHub', 'https://github.com/Nafis000', 2, true);

insert into public.navigation_items (label, href, sort_order, published) values
  ('Projects', '/projects', 1, true),
  ('Education', '/#education', 2, true),
  ('Experience', '/#experience', 3, true),
  ('Certifications', '/#certifications', 4, true),
  ('Skills', '/#skills', 5, true),
  ('Contact', '/#contact', 6, true);
