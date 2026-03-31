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
    tableRows: (string | number | React.ReactNode)[][],
}

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
