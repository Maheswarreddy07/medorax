const attendanceRecords = [
  {
    id: "001",
    name: "Dr. James Wilson",
    department: "Cardiology Department",
    date: "Oct 24, 2023",
    checkIn: "08:00 AM",
    checkOut: "05:30 PM",
    workingHours: "9.5 hrs",
    status: "Present",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHO2x-2KQ3tZ_o1YAeESpRv5i0nQyaqJAG-XiN2PhfaDapWytt8oVFhSP8MFpBXLLIh5KPthyQTupNY-jhS888qaIrrrMobfspZ-Yh55ncJ66q6h8iFPT1ZutbrqCydPaagaiNwi2umSp2s4BOSNSWldBfByx0ER3IsBo5X9ziCJ1qQle-hC-Iu13Bx-rxkOKAY-giXok2ctGebEYLvCtGrqx7DaupPkP7SmsV5tM2ZoCOZaFkKVyD"
  },
  {
    id: "002",
    name: "Sarah Mitchell",
    department: "Emergency Ward",
    date: "Oct 24, 2023",
    checkIn: "08:45 AM",
    checkOut: "05:15 PM",
    workingHours: "8.5 hrs",
    status: "Late",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDoOiXMQo79Pc2B3Bx6Yt8omRFyAVM7Fu8qDFAeOO2qCbqZ9ih8IeX_USopLXhGIkhqwWFT3Vf5kV4J6w-IhV-8Zg7u3dPqr--Mnco6C9sSY8eS0CKnBFs35S1iAy_NefE-eSylz3PWr-f6CNAF82tq8TOAyq07dAVfbkPH5pzV8SWR1849ZcwI9wpgitT1clW23LkyvjBGbEKCZ4CEDmtIzzLmWRdSMGI_z8vn3jGe7v43C_BBGGiJ"
  },
  {
    id: "003",
    name: "David Chen",
    department: "Administration",
    date: "Oct 24, 2023",
    checkIn: "--:--",
    checkOut: "--:--",
    workingHours: "0 hrs",
    status: "Absent",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB1wGa0hGL-QSHV1z87QsIbyUeWkKusTMIwTdYdNMesvMXngb_ubZgrY3TXVKj-CqCvAo1V8Bb5jYA02DVrQLJpbwyLfRbBNtAPtJUCyWEg5NPuM5oI8rabHOcWGS6bp97HWoQquiK9VGzO5QeEaneCiyQ1B581Q0utr2jf0_pi1GYzK_zC4Bve-c2pVLVlCI1B75JUlxx5hkcYJWONt_AfQ2GfouNAQw3_DpLk51Rsij8PBqqsTFr1"
  },
  {
    id: "004",
    name: "Elena Rodriguez",
    department: "Diagnostics Lab",
    date: "Oct 24, 2023",
    checkIn: "07:55 AM",
    checkOut: "04:00 PM",
    workingHours: "8.0 hrs",
    status: "Present",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjOqrhvGvvzrUmbhqL0kHVYwOc6jgOhCTlJElQGJ8Gg_yARVJG0mmeaavkYaOq7XJCarXygLyrbEeNm26jvCvib_Y0Byj3iK6txVkhIyCoukcDGcV193MXNeVHEps1UR8xDzeElVb1grupXw0KPRlnQgm70_Nd8ZiKCIuCYEzB1Wd1X46ScDw2Pa_9gTg4eJYFoaMoYXLkgxkP_yRE_fkAx-Y3DbBYl02TRycmnCBlJnjk-nn-G7ml"
  },
  {
    id: "005",
    name: "Dr. Robert Vance",
    department: "Surgical Unit",
    date: "Oct 24, 2023",
    checkIn: "07:30 AM",
    checkOut: "08:00 PM",
    workingHours: "12.5 hrs",
    status: "Present",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNFWk4FPGMgyGGoJLLBix_HZ6ILAfWNtj9Bq0Rx48dhCi1aeo801QXmTWfPygHb5xOgOSlmtmTI6jaTxsu8scBTJgqJyBxpTGNrMBA65eoNbyi33-kxR7CG-FJQE--31CYXZxSSkwLCO8HdgrrrMI2lJ1ltMGyu3fFf7I5B24lNIdH3xFOtTKVD9W6nZdTK8J-t7S6z8WxVpvB_kcB9AwQrnj4ockja90gaGIPuEjzynWikMOBD7E8"
  }
];

export default attendanceRecords;