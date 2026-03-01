import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface TableComponentProps {
    title: string,
    tableHeads: string[],
    tableRows: (string | number)[][],
}
const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    }
]

export function TableComponent({title, tableHeads, tableRows}: TableComponentProps) {


    return (
        <Card>
            <CardHeader className="font-semibold">{title}</CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>Total de registros: {tableRows.length}</TableCaption>
                    <TableHeader>
                        <TableRow>
                            {tableHeads.map((head, index) => (
                                <TableHead key={`${head}-${index}`} className="font-semibold">{head}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableRows.map((items, index) => (
                        <TableRow key={index}>
                            {items.map((item, index) => (
                                <TableCell key={index}>{item}</TableCell>
                            ))}
                        </TableRow>
                        ))}
                    </TableBody>
                    
                </Table>
            </CardContent>
        </Card>
    )
}
