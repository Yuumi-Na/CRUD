export default function HomePage() {
  const siteName: string = "Student Course Hub";
  const description: string = "เว็บไซต์สำหรับค้นหาและตรวจสอบข้อมูลรายวิชา";

  return (
    <main className="page">
      <h1>{siteName}</h1>
      <p>{description}</p>
      
      <section className="audience-card">
        <h2>กลุ่มผู้ใช้งานเป้าหมาย</h2>
        <p>เหมาะสำหรับนักศึกษาและอาจารย์ที่ต้องการดูสถานะการเปิดรับและหน่วยกิตของรายวิชา</p>
      </section>
    </main>
  );
}