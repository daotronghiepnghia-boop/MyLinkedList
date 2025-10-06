import java.util.Scanner;

class Student {
    String id;
    String name;
    int age;
    double gpa;

    Student(String id, String name, int age, double gpa) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }

    @Override
    public String toString() {
        return String.format("%-10s %-20s %-5d %-5.2f", id, name, age, gpa);
    }
}

class Node {
    Student data;
    Node next;

    Node(Student data) {
        this.data = data;
        this.next = null;
    }
}

class StudentList {
    Node head;

    // Thêm sinh viên vào cuối danh sách
    public void addStudent(Student s) {
        Node newNode = new Node(s);
        if (head == null) {
            head = newNode;
        } else {
            Node temp = head;
            while (temp.next != null) {
                temp = temp.next;
            }
            temp.next = newNode;
        }
        System.out.println("✅ Đã thêm sinh viên: " + s.name);
    }

    // Hiển thị danh sách sinh viên
    public void display() {
        if (head == null) {
            System.out.println("📭 Danh sách trống!");
            return;
        }
        System.out.printf("%-10s %-20s %-5s %-5s\n", "MSSV", "Họ tên", "Tuổi", "GPA");
        System.out.println("--------------------------------------------");
        Node temp = head;
        while (temp != null) {
            System.out.println(temp.data);
            temp = temp.next;
        }
    }

    // Tìm sinh viên theo MSSV
    public void findById(String id) {
        Node temp = head;
        while (temp != null) {
            if (temp.data.id.equalsIgnoreCase(id)) {
                System.out.println("🔎 Tìm thấy: " + temp.data);
                return;
            }
            temp = temp.next;
        }
        System.out.println("❌ Không tìm thấy sinh viên có MSSV: " + id);
    }

    // Xóa sinh viên theo MSSV
    public void removeById(String id) {
        if (head == null) {
            System.out.println("Danh sách trống!");
            return;
        }

        if (head.data.id.equalsIgnoreCase(id)) {
            head = head.next;
            System.out.println("🗑️ Đã xóa sinh viên đầu danh sách.");
            return;
        }

        Node temp = head;
        while (temp.next != null && !temp.next.data.id.equalsIgnoreCase(id)) {
            temp = temp.next;
        }

        if (temp.next == null) {
            System.out.println("❌ Không tìm thấy sinh viên có MSSV: " + id);
        } else {
            temp.next = temp.next.next;
            System.out.println("🗑️ Đã xóa sinh viên có MSSV: " + id);
        }
    }

    // Đếm số lượng sinh viên
    public int count() {
        int count = 0;
        Node temp = head;
        while (temp != null) {
            count++;
            temp = temp.next;
        }
        return count;
    }
}

public class QuanLySinhVien_IT24D {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StudentList list = new StudentList();

        while (true) {
            System.out.println("\n=== MENU QUẢN LÝ SINH VIÊN LỚP IT24D ===");
            System.out.println("1. Thêm sinh viên");
            System.out.println("2. Hiển thị danh sách");
            System.out.println("3. Tìm sinh viên theo MSSV");
            System.out.println("4. Xóa sinh viên theo MSSV");
            System.out.println("5. Đếm số sinh viên");
            System.out.println("0. Thoát");
            System.out.print("Chọn chức năng: ");

            int choice = sc.nextInt();
            sc.nextLine(); // bỏ dòng trống

            switch (choice) {
                case 1:
                    System.out.print("Nhập MSSV: ");
                    String id = sc.nextLine();
                    System.out.print("Nhập họ tên: ");
                    String name = sc.nextLine();
                    System.out.print("Nhập tuổi: ");
                    int age = sc.nextInt();
                    System.out.print("Nhập GPA: ");
                    double gpa = sc.nextDouble();
                    sc.nextLine();
                    list.addStudent(new Student(id, name, age, gpa));
                    break;

                case 2:
                    list.display();
                    break;

                case 3:
                    System.out.print("Nhập MSSV cần tìm: ");
                    String searchId = sc.nextLine();
                    list.findById(searchId);
                    break;

                case 4:
                    System.out.print("Nhập MSSV cần xóa: ");
                    String deleteId = sc.nextLine();
                    list.removeById(deleteId);
                    break;

                case 5:
                    System.out.println("👥 Số lượng sinh viên: " + list.count());
                    break;

                case 0:
                    System.out.println("👋 Thoát chương trình.");
                    return;

                default:
                    System.out.println("❗ Lựa chọn không hợp lệ.");
            }
        }
    }
}
