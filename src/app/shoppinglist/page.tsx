'use client'
import IndexComponent from "@/Components/Index/indexComponent";
import { HeaderListProvider } from "@/Context/Header/HeaderContext";

export default function ShoppingListPage() {

    return (        
        <HeaderListProvider>
            <IndexComponent />
        </HeaderListProvider>        
    )
}
