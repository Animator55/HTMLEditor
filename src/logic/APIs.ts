// import axios from 'axios';

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
        "content": [
            {
                "type": "Header",
                "components": [
                    {
                        "type": "Image",
                        "data": {
                            "className": "",
                            "src": "http://localhost:3000/static/media/isologo.f4331419dbc61b7445f8.png",
                            "style": {
                                "width": "200px",
                                "height": "70px"
                            }
                        }
                    },
                    {
                        "type": "Navigation",
                        "data": {
                            "className": "navigation-one-row navigation-template-1",
                            "style": {
                                "padding": "7px"
                            }
                        },
                        "components": []
                    }
                ],
                "data": {
                    "className": "",
                    "style": {
                        "background": "#182039",
                        "minHeight": "60px",
                        "padding": "10px"
                    }
                }
            },
            {
                "type": "Container",
                "components": [
                    {
                        "type": "Columns",
                        "components": [
                            {
                                "type": "Image",
                                "data": {
                                    "className": "image-rotation",
                                    "src": "http://localhost:3000/static/media/logo.9589b9cb3282b9b45eff.png",
                                    "style": {
                                        "width": "200px",
                                        "height": "200px",
                                        "background": "blue"
                                    }
                                }
                            },
                            {
                                "type": "Text",
                                "data": {
                                    "className": "",
                                    "text": "This is a text Example",
                                    "type": "h1",
                                    "style": {}
                                }
                            },
                            {
                                "type": "Text",
                                "data": {
                                    "className": "",
                                    "text": "And this a tiny module",
                                    "type": "h5",
                                    "style": {}
                                }
                            }
                        ],
                        "data": {
                            "className": "logo-container",
                            "style": {
                                "background": "#2b2a4b",
                                "minHeight": "60px",
                                "padding": "2rem",
                                "margin": "1%",
                                "color": "#f7e6f9",
                                "borderRadius": "20px"
                            }
                        }
                    }
                ],
                "data": {
                    "className": "",
                    "style": {
                        "background": "#6d6d6d",
                        "padding": "5px"
                    }
                }
            },
            {
                "type": "Container",
                "data": {
                    "className": "Container-d container-template-2",
                    "style": {}
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
                                "type": "Logo",
                                "data": {
                                    "text": "Logo",
                                    "className": "logo-1",
                                    "style": {
                                        "backgroundColor": "#ff0000",
                                        "width": "70px",
                                        "height": "70px",
                                        "margin": "2px",
                                        "borderRadius": "10px"
                                    }
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
                                "backgroundColor": "#d6d6d6",
                                "padding": "7px",
                                "borderRadius": "8px",
                                "margin": "0 5px 5px"
                            }
                        },
                        "components": [
                            {
                                "type": "Logo",
                                "data": {
                                    "text": "Logo",
                                    "className": "logo-1",
                                    "style": {
                                        "backgroundColor": "#ff0000",
                                        "width": "70px",
                                        "height": "70px",
                                        "margin": "2px",
                                        "borderRadius": "10px"
                                    }
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
                                "backgroundColor": "#d6d6d6",
                                "padding": "7px",
                                "borderRadius": "8px",
                                "margin": "0 5px 5px"
                            }
                        },
                        "components": [
                            {
                                "type": "Logo",
                                "data": {
                                    "text": "Logo",
                                    "className": "logo-1",
                                    "style": {
                                        "width": "70px",
                                        "height": "70px",
                                        "margin": "2px",
                                        "borderRadius": "10px"
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        "name": "home",
        "css": "body{margin:0}.screen{display:flex;flex-direction:column}.d-flex,.nav,a{display:flex}.w-100{width:100%}.w-50{width:50%}.h-100{height:100%}.h-50{height:100%}.justify-content-center{justify-content:center}.navigation-one-row,.navigation-two-row{display:flex;position:fixed;width:100%;top:0;z-index:2}.navigation-two-row{flex-wrap:wrap}.navigation-two-row > .nav{width:100%}.navigation-two-row.navigation-template-1 > .nav,.navigation-two-row.navigation-template-2 > .nav,.navigation-two-row.navigation-template-3 > .nav,.navigation-two-row.navigation-template-4 > .nav{justify-content:center}.navigation-template-1{align-items:center;justify-content:space-between;padding:5px}.navigation-template-2{align-items:center;justify-content:center}.navigation-template-3{align-items:center}.navigation-template-4{align-items:center;justify-content:end}.Container-d{display:flex}.container-template-1{padding:0 0 7px;margin:0 5px 5px}.container-template-2{padding:8px;margin:0 5px 5px}.container-template-3{padding:8px;margin:0 5px 5px;justify-content:end}.grid-1,.grid-2,.grid-3,.grid-4,.grid-5{display:grid}.grid-1{grid-template-columns:100%}.grid-2{grid-template-columns:50% 50%}.grid-3{grid-template-columns:33% 33% 33%}.grid-4{grid-template-columns:25% 25% 25% 25%}.grid-5{grid-template-columns:20% 20% 20% 20% 20%}.Columns-d{display:flex;flex-direction:column;width:100%}input{border:none}a{text-decoration:none;color:currentColor}button{display:flex;border:none;cursor:pointer;background-color:rgb(38, 126, 241)}.hover,.hover-2,.hover-3,.hover-4,.hover-5,button{transition:all 300ms}.hover:hover,button:hover{transition:all 300ms;opacity:0.7}.hover-2:hover{position:relative;transition:all 300ms;border:2px solid}.hover-3:hover{position:relative;transition:all 300ms;transform:scale(1.1)}.hover-4:hover{position:relative;transition:all 300ms;border-bottom:2px solid}.hover-5:hover{position:relative;transition:all 300ms;transform:scale(0.9)}.hover-6{position:relative;border-top:0 solid transparent;border-bottom:2px solid}.hover-6:hover{position:relative;transition:all 300ms;border-top:2px solid transparent;border-bottom:0 solid}.logo-1{display:flex;flex-direction:column;align-items:center}.logo-2{display:flex;align-items:center}.item-template-1{display:flex;justify-content:center;margin:7px;flex-wrap:wrap;align-items:center}.item-image-d{border-radius:5px;width:100%;height:200px}.social-prof-template-1{margin:2px;padding:5px;border-radius:25px;display:flex;align-items:center;justify-content:center;border:2px solid}.social-prof-template-2{margin:2px;padding:5px;border-radius:5px;border:none;filter: invert(100%);display:flex;align-items:center;justify-content:center}.input-template-1{border:none;border-bottom:1px solid}.input-template-2{border:1px solid;border-radius:5px}.button-template-1{padding:5px;border-radius:10px;filter: invert(100%)}.button-template-2{padding:5px;border-radius:10px}.button-template-3{padding:5px;border:2px solid;border-radius:10px;filter: invert(100%)}.button-template-4{padding:5px;border-radius:10px;border:2px solid}.form-template-1{padding:20px;border-radius:15px;border:1px solid;border-bottom:2px solid;border-right:2px solid;display:flex;flex-wrap:wrap;width:min-content;justify-content:flex-end}.form-template-2{padding:7px;border-radius:5px;border:2px solid;filter: invert(100%);display:flex;max-width:50%;margin:auto;justify-content:center;align-items:center}.form-template-3{padding:8px;border-radius:15px;display:flex;flex-wrap:wrap;width:min-content;justify-content:flex-end}.scale-0-5{transform:scale(0.5)}.scale-0-75{transform:scale(0.75)}.scale-0-88{transform:scale(0.88)}.scale-1-12{transform:scale(1.12)}.scale-1-25{transform:scale(1.25)}.scale-1-5{transform:scale(1.5)}.scale-1-75{transform:scale(1.75)}.scale-2{transform:scale(2.0)}",
        "title": "Home",
        "fonts": []
    },
    {
        "_id": "bf4dbcec144934358fc2d0dc",
        "content": [
            {
                "type": "Header",
                "components": [
                    {
                        "type": "Image",
                        "data": {
                            "className": "",
                            "src": "http://localhost:3000/static/media/isologo.f4331419dbc61b7445f8.png",
                            "style": {
                                "width": "200px",
                                "height": "65px"
                            }
                        }
                    }
                ],
                "data": {
                    "className": "Container-d",
                    "style": {
                        "background": "#182039",
                        "minHeight": "50px",
                        "padding": "10px"
                    }
                }
            },
            {
                "type": "Container",
                "components": [
                    {
                        "type": "Text",
                        "data": {
                            "className": "title",
                            "type": "h1",
                            "text": "<h1 class=\"ql-align-center\">Octagonal Example</h1>",
                            "style": {}
                        }
                    },
                    {
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
                    }
                ],
                "data": {
                    "className": "",
                    "style": {
                        "background": "#6d6d6d",
                        "padding": "5px"
                    }
                }
            },
            {
                "type": "Container",
                "components": [
                    {
                        "type": "Image",
                        "data": {
                            "className": "",
                            "src": "http://localhost:3000/static/media/logo.9589b9cb3282b9b45eff.png",
                            "style": {
                                "width": "200px",
                                "height": "200px"
                            }
                        }
                    },
                    {
                        "type": "Text",
                        "data": {
                            "className": "tec",
                            "type": "h1",
                            "text": "<h4 class=\"ql-align-center\"><em>\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\"</em></h4>",
                            "style": {
                                "width": "20rem"
                            }
                        }
                    }
                ],
                "data": {
                    "className": "logo-container",
                    "style": {
                        "background": "#6d6d6d",
                        "padding": "2rem"
                    }
                }
            },
            {
                "type": "Container",
                "components": [
                    {
                        "type": "Text",
                        "data": {
                            "className": "",
                            "type": "h1",
                            "text": "<h2>What is Lorem Ipsum?</h2><ul><li class=\"ql-align-justify\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</li></ul><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><br></p><h2>Why do we use it?</h2><ul><li class=\"ql-align-justify\">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</li></ul>",
                            "style": {
                                "padding": "30px"
                            }
                        }
                    }
                ],
                "data": {
                    "className": "",
                    "style": {
                        "background": "#6d6d6d",
                        "padding": "5px"
                    }
                }
            },
            {
                "type": "ProductsGrid",
                "data": {
                    "className": "Container-d container-template-2",
                    "style": {
                        "background": "#616e97",
                        "padding": "7px",
                        "margin": "15px"
                    },
                    "tags": []
                },
                "components": [
                    {
                        "type": "Text",
                        "data": {
                            "type": "h2",
                            "text": "Header",
                            "style": {}
                        }
                    }
                ]
            },
            {
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
                                    "text": "Other things",
                                    "type": "h4",
                                    "style": {}
                                }
                            },
                            {
                                "type": "Text",
                                "data": {
                                    "text": "Tgdgnaofimas fdaspomfasf",
                                    "type": "h5",
                                    "style": {}
                                }
                            },
                            {
                                "type": "Text",
                                "data": {
                                    "text": "Tgdgnaofimas fdaspomfasf",
                                    "type": "h5",
                                    "style": {}
                                }
                            },
                            {
                                "type": "Text",
                                "data": {
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
                                    "text": "Other things",
                                    "type": "h4",
                                    "style": {}
                                }
                            },
                            {
                                "type": "Text",
                                "data": {
                                    "text": "Tgdgnaofimas fdaspomfasf",
                                    "type": "h5",
                                    "style": {}
                                }
                            },
                            {
                                "type": "Text",
                                "data": {
                                    "text": "Tgdgnaofimas fdaspomfasf",
                                    "type": "h5",
                                    "style": {}
                                }
                            },
                            {
                                "type": "Text",
                                "data": {
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
                                    "text": "Tgdgnaofimas fdaspomfasf",
                                    "type": "h5",
                                    "style": {}
                                }
                            }
                        ]
                    }
                ]
            }
        ],
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
export async function getLists(type) {
    // let list = await axios.post(`http://localhost:3003/v1/get${type}`, data).then((response)=>{
    //     return response.data.data
    // })
    // .catch((error) => {
    //     console.error(error);
    // })
    // console.log(list)
    // return list
    return localStorageJSON[type] !== undefined ? localStorageJSON[type] : false
}


export function getViews(id:string) {
    // if ( !checkLocalSessionId() ) {
    //     return "auth"
    // }
    // let list = await axios.post(`http://localhost:3003/v1/get${id}`, data).then((response)=>{
    //     return response.data.data
    // })
    // .catch((error) => {
    //     console.error(error);
    // })
    // console.log(list)
    // return list
    let JSON = {}
    let views = []
    for (let i = 0; i < JSONtemplate.views.length; i++) {
        views.push({"_id": JSONtemplate.views[i]._id, "name": JSONtemplate.views[i].name})
        if(id === JSONtemplate.views[i]._id) {
            JSON = JSONtemplate.views[i];
        }
    }
    return [JSON, views]
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

export async function getFontsList (query, sort, PageNumb){
    if ( !checkLocalSessionId() ) {
        return "auth"
    }

    console.log("font request")
    // let resultList = await axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBD7hD35Do5YSFnTetnrHL4_wEB3r_4K7c&sort=${sort}`)
    // .then(async(response) => {
    //     const FontArray = response.data.items
    //     let regex = new RegExp(query, "i")
    //     let filtredArray = []
    //     for (const key in FontArray){
    //         if (regex.test(FontArray[key].family)) {
    //             filtredArray.push(FontArray[key])
    //         }
    //     }
    //     let page = filtredArray.splice(PageNumb*30, 30)
    //     page.forEach((font)=>{
    //         var junction_font = new FontFace(font.family, `url(${font.files.regular})`)
    //         junction_font.load()
    //         .then(async (loaded_face)=> {
    //             await document.fonts.add(loaded_face);
    //         }).catch(function(error) {
    //             console.log(error)
    //         })
    //     })
    //     return page
    // })
    // .catch((error) => {
    //     console.log(error)
    // });
    // return resultList
}

const A = {
    "_id": "0dbb67c854d308c7f3d4e45d",
    "content": [
        {
            "type": "Header",
            "components": [
                {
                    "type": "Image",
                    "data": {
                        "className": "",
                        "src": "http://localhost:3000/static/media/isologo.f4331419dbc61b7445f8.png",
                        "style": {
                            "width": "200px",
                            "height": "65px"
                        }
                    }
                }
            ],
            "data": {
                "className": "Container-d",
                "style": {
                    "background": "#182039",
                    "minHeight": "50px",
                    "padding": "10px"
                }
            }
        },
        {
            "type": "Container",
            "components": [
                {
                    "type": "Text",
                    "data": {
                        "className": "title",
                        "type": "h1",
                        "text": "<h1 class=\"ql-align-center\">Octagonal Example</h1>",
                        "style": {}
                    }
                },
                {
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
                }
            ],
            "data": {
                "className": "",
                "style": {
                    "background": "#6d6d6d",
                    "padding": "5px"
                }
            }
        },
        {
            "type": "Container",
            "components": [
                {
                    "type": "Image",
                    "data": {
                        "className": "",
                        "src": "http://localhost:3000/static/media/logo.9589b9cb3282b9b45eff.png",
                        "style": {
                            "width": "200px",
                            "height": "200px"
                        }
                    }
                },
                {
                    "type": "Text",
                    "data": {
                        "className": "tec",
                        "type": "h1",
                        "text": "<h4 class=\"ql-align-center\"><em>\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\"</em></h4>",
                        "style": {
                            "width": "20rem"
                        }
                    }
                }
            ],
            "data": {
                "className": "logo-container",
                "style": {
                    "background": "#6d6d6d",
                    "padding": "2rem"
                }
            }
        },
        {
            "type": "Container",
            "components": [
                {
                    "type": "Text",
                    "data": {
                        "className": "",
                        "type": "h1",
                        "text": "<h2>What is Lorem Ipsum?</h2><ul><li class=\"ql-align-justify\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</li></ul><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><br></p><h2>Why do we use it?</h2><ul><li class=\"ql-align-justify\">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</li></ul>",
                        "style": {
                            "padding": "30px"
                        }
                    }
                }
            ],
            "data": {
                "className": "",
                "style": {
                    "background": "#6d6d6d",
                    "padding": "5px"
                }
            }
        },
        {
            "type": "ProductsGrid",
            "data": {
                "className": "Container-d container-template-2",
                "style": {
                    "background": "#616e97",
                    "padding": "7px",
                    "margin": "15px"
                },
                "tags": []
            },
            "components": [
                {
                    "type": "Text",
                    "data": {
                        "type": "h2",
                        "text": "Header",
                        "style": {}
                    }
                }
            ]
        },
        {
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
                                "text": "Other things",
                                "type": "h4",
                                "style": {}
                            }
                        },
                        {
                            "type": "Text",
                            "data": {
                                "text": "Tgdgnaofimas fdaspomfasf",
                                "type": "h5",
                                "style": {}
                            }
                        },
                        {
                            "type": "Text",
                            "data": {
                                "text": "Tgdgnaofimas fdaspomfasf",
                                "type": "h5",
                                "style": {}
                            }
                        },
                        {
                            "type": "Text",
                            "data": {
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
                                "text": "Other things",
                                "type": "h4",
                                "style": {}
                            }
                        },
                        {
                            "type": "Text",
                            "data": {
                                "text": "Tgdgnaofimas fdaspomfasf",
                                "type": "h5",
                                "style": {}
                            }
                        },
                        {
                            "type": "Text",
                            "data": {
                                "text": "Tgdgnaofimas fdaspomfasf",
                                "type": "h5",
                                "style": {}
                            }
                        },
                        {
                            "type": "Text",
                            "data": {
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
                                "text": "Tgdgnaofimas fdaspomfasf",
                                "type": "h5",
                                "style": {}
                            }
                        }
                    ]
                }
            ]
        }
    ],
    "name": "home",
    "css": "body{margin:0}.screen{display:flex;flex-direction:column}.d-flex,.nav,a{display:flex}.w-100{width:100%}.w-50{width:50%}.h-100{height:100%}.h-50{height:100%}.justify-content-center{justify-content:center}.navigation-one-row,.navigation-two-row{display:flex;position:fixed;width:100%;top:0;z-index:2}.navigation-two-row{flex-wrap:wrap}.navigation-two-row > .nav{width:100%}.navigation-two-row.navigation-template-1 > .nav,.navigation-two-row.navigation-template-2 > .nav,.navigation-two-row.navigation-template-3 > .nav,.navigation-two-row.navigation-template-4 > .nav{justify-content:center}.navigation-template-1{align-items:center;justify-content:space-between;padding:5px}.navigation-template-2{align-items:center;justify-content:center}.navigation-template-3{align-items:center}.navigation-template-4{align-items:center;justify-content:end}.Container-d{display:flex}.container-template-1{padding:0 0 7px;margin:0 5px 5px}.container-template-2{padding:8px;margin:0 5px 5px}.container-template-3{padding:8px;margin:0 5px 5px;justify-content:end}.grid-1,.grid-2,.grid-3,.grid-4,.grid-5{display:grid}.grid-1{grid-template-columns:100%}.grid-2{grid-template-columns:50% 50%}.grid-3{grid-template-columns:33% 33% 33%}.grid-4{grid-template-columns:25% 25% 25% 25%}.grid-5{grid-template-columns:20% 20% 20% 20% 20%}.Columns-d{display:flex;flex-direction:column;width:100%}input{border:none}a{text-decoration:none;color:currentColor}button{display:flex;border:none;cursor:pointer;background-color:rgb(38, 126, 241)}.hover,.hover-2,.hover-3,.hover-4,.hover-5,button{transition:all 300ms}.hover:hover,button:hover{transition:all 300ms;opacity:0.7}.hover-2:hover{position:relative;transition:all 300ms;border:2px solid}.hover-3:hover{position:relative;transition:all 300ms;transform:scale(1.1)}.hover-4:hover{position:relative;transition:all 300ms;border-bottom:2px solid}.hover-5:hover{position:relative;transition:all 300ms;transform:scale(0.9)}.hover-6{position:relative;border-top:0 solid transparent;border-bottom:2px solid}.hover-6:hover{position:relative;transition:all 300ms;border-top:2px solid transparent;border-bottom:0 solid}.logo-1{display:flex;flex-direction:column;align-items:center}.logo-2{display:flex;align-items:center}.item-template-1{display:flex;justify-content:center;margin:7px;flex-wrap:wrap;align-items:center}.item-image-d{border-radius:5px;width:100%;height:200px}.social-prof-template-1{margin:2px;padding:5px;border-radius:25px;display:flex;align-items:center;justify-content:center;border:2px solid}.social-prof-template-2{margin:2px;padding:5px;border-radius:5px;border:none;filter: invert(100%);display:flex;align-items:center;justify-content:center}.input-template-1{border:none;border-bottom:1px solid}.input-template-2{border:1px solid;border-radius:5px}.button-template-1{padding:5px;border-radius:10px;filter: invert(100%)}.button-template-2{padding:5px;border-radius:10px}.button-template-3{padding:5px;border:2px solid;border-radius:10px;filter: invert(100%)}.button-template-4{padding:5px;border-radius:10px;border:2px solid}.form-template-1{padding:20px;border-radius:15px;border:1px solid;border-bottom:2px solid;border-right:2px solid;display:flex;flex-wrap:wrap;width:min-content;justify-content:flex-end}.form-template-2{padding:7px;border-radius:5px;border:2px solid;filter: invert(100%);display:flex;max-width:50%;margin:auto;justify-content:center;align-items:center}.form-template-3{padding:8px;border-radius:15px;display:flex;flex-wrap:wrap;width:min-content;justify-content:flex-end}.scale-0-5{transform:scale(0.5)}.scale-0-75{transform:scale(0.75)}.scale-0-88{transform:scale(0.88)}.scale-1-12{transform:scale(1.12)}.scale-1-25{transform:scale(1.25)}.scale-1-5{transform:scale(1.5)}.scale-1-75{transform:scale(1.75)}.scale-2{transform:scale(2.0)}",
    "title": "Home",
    "fonts": []
}
