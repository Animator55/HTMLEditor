
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

export function getViews() {
    return JSONtemplate.views[0]
}