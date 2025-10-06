public class MyLinkedList {

    // Node class
    static class Node {
        String data;
        Node next;

        Node(String data) {
            this.data = data;
            this.next = null;
        }
    }

    // In danh sách
    public static void show(Node head) {
        if (head == null) {
            System.out.println("Empty list");
            return;
        }
        Node p = head;
        while (p != null) {
            System.out.print(p.data);
            if (p.next != null)
                System.out.print(" -> ");
            p = p.next;
        }
        System.out.println();
    }

    // Thêm vào đầu
    public static Node pushFront(Node head, String x) {
        Node node = new Node(x);
        node.next = head;
        return node;
    }

    // Thêm vào cuối
    public static Node pushBack(Node head, String x) {
        Node node = new Node(x);
        if (head == null)
            return node;

        Node p = head;
        while (p.next != null) {
            p = p.next;
        }
        p.next = node;
        return head;
    }

    // Xoá node đầu tiên có giá trị x
    public static Node delete(Node head, String x) {
        if (head == null)
            return null;

        // Xoá head
        if (head.data.equals(x)) {
            return head.next;
        }

        Node p = head;
        while (true) {
            if (p.next == null)
                break; // không tìm thấy
            if (p.next.data.equals(x)) {
                p.next = p.next.next; // bỏ qua node cần xoá
                break;
            }
            p = p.next;
        }
        return head;
    }

    public static void main(String[] args) {
        Node head = null;

        // thêm 2 node ban đầu
        head = pushBack(head, "A");
        head = pushBack(head, "B");

        System.out.print("Initial: ");
        show(head);

        head = pushFront(head, "X");
        System.out.print("After pushFront(\"X\"): ");
        show(head);

        head = pushBack(head, "Y");
        System.out.print("After pushBack(\"Y\"): ");
        show(head);

        head = delete(head, "B");
        System.out.print("After delete(\"B\"): ");
        show(head);

        head = delete(head, "X");
        System.out.print("After delete(\"X\"): ");
        show(head);
    }
}
