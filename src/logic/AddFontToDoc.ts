export default function AddFontToDoc(Obj: {
    [key: string]: {
        family: string
        variants: string[]
        subsets: string[]
        version: string
        lastModified: string
        files: {
            regular: string
        }
        category: string
        kind: string
    }
}) {
    for (const key in Obj) {
        var junction_font = new FontFace(Obj[key].family, `url(${Obj[key].files.regular})`)
        junction_font.load()
            .then(async (loaded_face) => {
                await document.fonts.add(loaded_face);
            }).catch(function (error) {
                console.log(error)
            })
    }
}