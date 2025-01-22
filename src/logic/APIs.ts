
function checkLocalSessionId() {
    let sessionId = window.localStorage.getItem("sessionId");
    if (sessionId !== "" && sessionId !== undefined && sessionId !== null) {
        return true
    } 
    return false
}
///// delete when apis
let localStorageJSON = {
    Views: [
        {"_id": "0dbb67c854d308c7f3d4e45d", "Nombre": "home", "Title": "home", "Description": ""}, 
        {"_id": "bf4dbcec144934358fc2d0dc", "Nombre": "cart", "Title": "cart", "Description": ""}, 
        {"_id": "263c8be42b08f8240b0fd997", "Nombre": "list", "Title": "list", "Description": ""}, 
        {"_id": "pdmkovglmrfvgidrnfoignoirj", "Nombre": "verylargenameexample", "Title": "verylargenameexample", "Description": ""}, 
        {"_id": "6f032efa571234c948e73aac", "Nombre": "section1", "Title": "section1", "Description": ""}
    ],
    Components: [
        {"_id": "fbaifsnfiasnfksafck", "Nombre": "Navigation", "Tipo": "container", "Description": "A fixed component used for navigation", "ClassName": "navigation-one-row", "Style": [],"Estado": "Activo"}, 
        {"_id": "dfasferfdscvdscv", "Nombre": "Footer", "Tipo": "container", "Description": "A fixed component used for extra information", "ClassName": "", "Style": [], "Estado": "Activo"}, 
    ],
    Products: [
        {"_id": "5356", "Image": "#d7d7d7", "Nombre": "SaleExample", "Tipo": "Idonknow30", "Descripción": "", "Tags": [], "Estado": "Inactivo"},
        {"_id": "0000", "Image": "#d7d7d7", "Nombre": "a", "Tipo": "Idonknow", "Descripción": "", "Tags": [], "Estado": "Activo"},
        {"_id": "0031", "Image": "#d7d7d7", "Nombre": "SaleExample2That is more long than everyone", "Tipo": "Idonknow", "Descripción": "", "Tags": [], "Estado": "Activo"},
        {"_id": "0200", "Image": "#d7d7d7", "Nombre": "SaleExample23", "Tipo": "Idonknow30d", "Descripción": "", "Tags": [], "Estado": "Activo"},
        {"_id": "2454", "Image": "#d7d7d7", "Nombre": "SaleExsfafas", "Tipo": "Idonknow30", "Descripción": "", "Tags": [], "Estado": "Inactivo"},
        {"_id": "fasf", "Image": "#d7d7d7", "Nombre": "SaleExample", "Tipo": "Idonknow30", "Descripción": "", "Tags": [], "Estado": "Inactivo"},
        {"_id": "fdsg", "Image": "#d7d7d7", "Nombre": "a", "Tipo": "Idonknow", "Descripción": "", "Tags": [], "Estado": "Activo"},
        {"_id": "gred", "Image": "#d7d7d7", "Nombre": "SaleExample2That is more long than everyone", "Tipo": "Idonknow", "Descripción": "", "Tags": [], "Estado": "Activo"},
        {"_id": "5yhf", "Image": "#d7d7d7", "Nombre": "SaleExample23", "Tipo": "Idonknow30d", "Descripción": "", "Tags": [], "Estado": "Activo"},
        {"_id": "dsfg", "Image": "#d7d7d7", "Nombre": "SaleExsfafas", "Tipo": "Idonknow30", "Descripción": "", "Tags": [], "Estado": "Inactivo"},
    ],
    Images: [
        {"_id": "0000", "Image": "isologo.f4331419dbc61b7445f8.png", "Nombre": "Cat", "Tipo": "jpg", "Descripción": "", "Estado": "Activo"},
        {"_id": "5345", "Image": "logo.9589b9cb3282b9b45eff.png", "Nombre": "Logo", "Tipo": "png", "Descripción": "", "Estado": "Activo"},
        {"_id": "6567", "Image": "isologo.f4331419dbc61b7445f8.png", "Nombre": "Cat", "Tipo": "jpg", "Descripción": "", "Estado": "Activo"},
        {"_id": "9870", "Image": "logo.9589b9cb3282b9b45eff.png", "Nombre": "Logo", "Tipo": "png", "Descripción": "", "Estado": "Activo"},
        {"_id": "4566", "Image": "isologo.f4331419dbc61b7445f8.png", "Nombre": "Cat", "Tipo": "jpg", "Descripción": "", "Estado": "Activo"},
        {"_id": "0980", "Image": "logo.9589b9cb3282b9b45eff.png", "Nombre": "Logo", "Tipo": "png", "Descripción": "", "Estado": "Activo"},
    ],
    Videos: [
        {"_id": "5356", "Image": "#d7d7d7", "Nombre": "Video 1", "Tipo": "mov", "Descripción": "", "Estado": "Inactivo"},
        {"_id": "0000", "Image": "#d7d7d7", "Nombre": "Video 2", "Tipo": "mp4", "Descripción": "", "Estado": "Activo"},
    ],
    Sections: [
        {"_id": "5356", "Nombre": "Section 1", "Descripción": "", "Estado": "Inactivo"},
        {"_id": "0000", "Nombre": "Section 2", "Descripción": "", "Estado": "Activo"},
        {"_id": "0031", "Nombre": "Section 3", "Descripción": "", "Estado": "Activo"},    
    ],
    Tags: [
        {"_id": "5356", "Nombre": "Tag 1", "Descripción": "", "Estado": "Inactivo"},
        {"_id": "0000", "Nombre": "Tag 2", "Descripción": "", "Estado": "Activo"},
        {"_id": "0031", "Nombre": "Tag 3", "Descripción": "", "Estado": "Activo"},    
    ],
    HiddenTags: [
        {"_id": "5356", "Nombre": "Tag so hidden 1", "Descripción": "", "Estado": "Inactivo"},
        {"_id": "0000", "Nombre": "Tag 2 that is more hidden", "Descripción": "", "Estado": "Activo"},
        {"_id": "0031", "Nombre": "Tag 3 not hidden", "Descripción": "", "Estado": "Activo"},    
    ],
    Users: [
        {"_id": "5356", "Nombre": "nahuelibarra", "Email": "nahuelibarra@do2software.com", "Permisos": "Administrador", "Estado": "Inactivo"},
        {"_id": "0000", "Nombre": "felipelecot", "Email": "felipelecot@do2software.com", "Permisos": "Dueño", "Estado": "Activo"},
    ],
}

const JSONtemplate = {"views": [
    {
        "_id": "0dbb67c854d308c7f3d4e45d",
        "content": [],
        "name": "newHome",
        "title": "Home",
    },
    { "_id": "263c8be42b08f8240b0fd997", "name": "list", "content": [] },
    { "_id": "pdmkovglmrfvgidrnfoignoirj", "name": "verylargenameexample",
        "content": [
        {
            "type": "Container",
            "components": [
                {
                    "type": "Header",
                    "components": [],
                    "data": {
                        "className": "Container-d",
                        "style": {
                            "background": "#182039",
                            "height": "200px",
                            "padding": "10px"
                        }
                    }
                },
                {
                    "type": "Columns",
                    "components": [],
                    "data": {
                        "className": "Columns-d",
                        "style": {
                            "background": "#ededed",
                            "height": "120px",
                            "padding": "5px",
                            "margin": "5%"
                        }
                    }
                }
            ],
            "data": {
                "className": "",
                "style": {
                    "width": "",
                    "height": "100%",
                    "background": "#6d6d6d",
                    "color": "",
                    "padding": "5px",
                    "margin": "",
                    "border": "",
                    "borderStyle": "none",
                    "borderColor": "",
                    "borderRadius": ""
                }}}
        ] 
    },
    { "_id": "6f032efa571234c948e73aac", "name": "section1", "content": [] }
]}
const JsonComponents = {"content": [
    {
        "_id": "fbaifsnfiasnfksafck",
        "type": "Navigation",
        "data": {
            "className": "navigation-one-row navigation-template-1",
            "style": {
                "background": "#ebebeb",
                "borderBottom": "2px solid #d1d1d1",
                "padding": "7px"
            }
        },
        "components": [
            {
                "type": "Logo",
                "data": {
                    "text": "TestPage.org",
                    "className": "logo-2 hover-3",
                    "style": {
                        "background": "#ff0000",
                        "borderRadius": "25px",
                        "width": "80px",
                        "height": "80px"
                    }
                }
            }
        ]
    },
    {
        "_id": "dfasferfdscvdscv",
        "type": "Footer",
        "data": {
            "className": "Container-d container-template-2",
            "style": {
                "background": "#ebebeb",
                "padding": "7px",
                "marginTop": "5px"
            }
        },
        "components": [
            {
                "type": "Columns",
                "data": {
                    "className": "Columns-d",
                    "style": {
                        "alignItems": "center",
                        "background": "#d6d6d6",
                        "padding": "7px",
                        "borderRadius": "8px",
                        "margin": "0 5px 5px"
                    }
                },
                "components": [
                    {
                        "type": "Text",
                        "data": {
                            "className": "",
                            "text": "Other things",
                            "type": "h4",
                            "style": {}
                        }
                    },
                    {
                        "type": "Text",
                        "data": {
                            "className": "",
                            "text": "Tgdgnaofimas fdaspomfasf",
                            "type": "h5",
                            "style": {}
                        }
                    },
                    {
                        "type": "Text",
                        "data": {
                            "className": "",
                            "text": "Tgdgnaofimas fdaspomfasf",
                            "type": "h5",
                            "style": {}
                        }
                    },
                    {
                        "type": "Text",
                        "data": {
                            "className": "",
                            "text": "Tgdgnaofimas fdaspomfasf",
                            "type": "h5",
                            "style": {}
                        }
                    }
                ]
            },
            {
                "type": "Columns",
                "data": {
                    "className": "Columns-d",
                    "style": {
                        "alignItems": "center",
                        "background": "#d6d6d6",
                        "padding": "7px",
                        "borderRadius": "8px",
                        "margin": "0 5px 5px"
                    }
                },
                "components": [
                    {
                        "type": "Text",
                        "data": {
                            "className": "",
                            "text": "Other things",
                            "type": "h4",
                            "style": {}
                        }
                    },
                    {
                        "type": "Text",
                        "data": {
                            "className": "",
                            "text": "Tgdgnaofimas fdaspomfasf",
                            "type": "h5",
                            "style": {}
                        }
                    },
                    {
                        "type": "Text",
                        "data": {
                            "className": "",
                            "text": "Tgdgnaofimas fdaspomfasf",
                            "type": "h5",
                            "style": {}
                        }
                    },
                    {
                        "type": "Text",
                        "data": {
                            "className": "",
                            "text": "Tgdgnaofimas fdaspomfasf",
                            "type": "h5",
                            "style": {}
                        }
                    }
                ]
            },
            {
                "type": "Columns",
                "data": {
                    "className": "Columns-d",
                    "style": {
                        "alignItems": "center",
                        "padding": "7px",
                        "display": "flex",
                        "flexDirection": "column",
                        "margin": "0 5px 5px"
                    }
                },
                "components": [
                    {
                        "type": "Text",
                        "data": {
                            "className": "",
                            "text": "Tgdgnaofimas fdaspomfasf",
                            "type": "h5",
                            "style": {}
                        }
                    }
                ]
            }
        ]
    }
]}
/////
export function getLists(type) {
    console.log(type)
    // let list = await axios.post(`http://localhost:3003/v1/get${type}`, data).then((response)=>{
    //     return response.data.data
    // })
    // .catch((error) => {
    //     console.error(error);
    // })
    // console.log(list)
    // return list
    return localStorageJSON[type] !== undefined ? localStorageJSON[type] : "false"
}


export function getViews() {
    
    // let list = await axios.post(`http://localhost:3003/v1/get${id}`, data).then((response)=>{
    //     return response.data.data
    // })
    // .catch((error) => {
    //     console.error(error);
    // })
    // console.log(list)
    // return list
    let JSON = JSONtemplate.views[0]
    // for (let i = 0; i < JSONtemplate.views.length; i++) {
    //     views.push({"_id": JSONtemplate.views[i]._id, "name": JSONtemplate.views[i].name})
    //     if(id === JSONtemplate.views[i]._id) {
    //         JSON = JSONtemplate.views[i];
    //     }
    // }
    return JSON
}

export async function getComponents(id) {
    if ( !checkLocalSessionId() ) {
        return "auth"
    }

    let data = {
        siteId: window.localStorage.getItem("siteId")
    }
    
    console.log(id)
    // let list = await axios.post(`http://localhost:3003/v1/get${id}`, data).then((response)=>{
    //     return response.data.data
    // })
    // .catch((error) => {
    //     console.error(error);
    // })
    // console.log(list)
    // return list
    let JSON
    let views = []
    for (let i = 0; i < JsonComponents.content.length; i++) {
        views.push({"_id": JsonComponents.content[i]._id, "name": JsonComponents.content[i].type})
        if(id === JsonComponents.content[i]._id) {
            JSON = {"content": [JsonComponents.content[i]]}
        }
    }
    return [JSON, views]
}

// export async function getFontsList (query, sort, PageNumb){
//     if ( !checkLocalSessionId() ) {
//         return "auth"
//     }

//     console.log("font request")
//     let resultList = await axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBD7hD35Do5YSFnTetnrHL4_wEB3r_4K7c&sort=${sort}`)
//     .then(async(response) => {
//         const FontArray = response.data.items
//         let regex = new RegExp(query, "i")
//         let filtredArray = []
//         for (const key in FontArray){
//             if (regex.test(FontArray[key].family)) {
//                 filtredArray.push(FontArray[key])
//             }
//         }
//         let page = filtredArray.splice(PageNumb*30, 30)
//         page.forEach((font)=>{
//             var junction_font = new FontFace(font.family, `url(${font.files.regular})`)
//             junction_font.load()
//             .then(async (loaded_face)=> {
//                 await document.fonts.add(loaded_face);
//             }).catch(function(error) {
//                 console.log(error)
//             })
//         })
//         return page
//     })
//     .catch((error) => {
//         console.log(error)
//     });
//     return resultList
// }
