import { supabase } from "@/lib/supabaseStorage"
import { getCachedSession } from "@/services/getCachedSession";
import { NextResponse } from "next/server"
import { codec, success } from "zod"

export async function POST(request: Request) {
  const session = await getCachedSession();
  if (!session?.user.id) {
    return NextResponse.json({
        success: false,
        message: "Você não tem permissão para fazer upload de arquivos"
    }, { status: 401 })
  }

    try {
        const body = await request.formData()
        const file = body.get("file") as File | null

        console.log("file", file)

        if(!file) {
            return NextResponse.json({
                success: false,
                message: "Nenhum arquivo fornecido"
            }, {
                status: 400
            })
        }

        console.log("body e file",body, file)

        const filePath = `pijamas/${Date.now()}-${file.name}`
        const { data, error } = await supabase.storage.from("produtos").upload(filePath, file, {
            contentType: file.type,
            upsert: false
        })

        if (error){
            console.log(error)
            return NextResponse.json({
                success: false,
                message: "Este tipo de arquivo não é permitido. Por favor, utilize imagens (png, jpg, jpeg, webp)",
            } , {
                status: 400
            })
        }

        return NextResponse.json({
            success: true,
            message: "Upload realizado com sucesso",
            data: data
        }, {
            status: 200
        })

        

    } catch (error){
        console.log("ERROR", error)

        return NextResponse.json({
            success: false,
            message: "Erro ao fazer upload do arquivo",
            error: error
        }, {
            status: 500
        })
    }
}
