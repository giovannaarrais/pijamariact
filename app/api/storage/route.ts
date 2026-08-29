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


        if(!file) {
            return NextResponse.json({
                success: false,
                message: "Nenhum arquivo fornecido"
            }, {
                status: 400
            })
        }


        const filePath = `pijamas/${Date.now()}-${file.name}`
        const { data, error } = await supabase.storage.from("produtos").upload(filePath, file, {
            contentType: file.type,
            upsert: false
        })

        if (error){
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

        return NextResponse.json({
            success: false,
            message: "Erro ao fazer upload do arquivo",
            error: error
        }, {
            status: 500
        })
    }
}

export async function DELETE(request: Request) {
    const session = await getCachedSession();
    if (!session?.user.id) {
        return NextResponse.json({
            success: false,
            message: "Você não tem permissão para apagar arquivos"
        }, { status: 401 })
    }

    try {
        const { fileNames } = await request.json();

        if (!fileNames || !Array.isArray(fileNames) || fileNames.length === 0) {
            return NextResponse.json({
                success: false,
                message: "Nenhum arquivo especificado para exclusão"
            }, { status: 400 })
        }

        // Map filenames to include directory prefix 'pijamas/'
        const paths = fileNames.map(name => `pijamas/${name}`);

        const { data, error } = await supabase.storage.from("produtos").remove(paths);

        if (error) {
            return NextResponse.json({
                success: false,
                message: "Erro ao apagar os arquivos no storage",
                error: error.message
            }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            message: `${fileNames.length} imagem(ns) apagada(s) com sucesso`,
            data
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Erro ao processar a requisição de exclusão",
            error: error.message || error
        }, { status: 500 })
    }
}

