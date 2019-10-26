export default function sectionParser(object: any, tree: any): string {
    let parsedSection = tagParser(object);

    for (let subsection in object.sections) {
        const section = object.section[subsection];

        parsedSection += sectionParser(section, tree);
    }

    if (tree) {
        for (let field in tree.fields) {
            const actualField = tree.fields[field];
    
            if (actualField.section === object.id) {
                parsedSection += tagParser(actualField);
            }
        }
    }

    if (! object.section) {
        parsedSection += `</${object.element}>`;
    }

    return parsedSection;
}

function tagParser(object: any): string {
    let parsedTag = `<${object.element}`;

    for (let prop in object) {
        if (prop !== 'element' && prop !== 'value' && prop !== 'section') {
            const propValue = object[prop];

            parsedTag += `
                ${prop}=`;

            parsedTag += typeof propValue === 'string' ?
                    `"${propValue}"` : `{${propValue}}`;
        }
    }

    parsedTag += object.value ? `
        >
            ${object.value}
        </${object.element}>
    ` : (object.section ? `/>` : '>');

    return parsedTag;
}