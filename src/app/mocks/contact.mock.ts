import { Contact, Link } from "../components/interfaces/contact-interface";

export const CONTACTS: Contact[] = [
    {
        contactType: 'Numero Telefonico', contactValue: '+39 380 194 9521', icon: 'assets/icons/telephone.png', copy: true
    },
    {
        contactType: 'Email', contactValue: 'afischetti.work@gmail.com', icon: 'assets/icons/email_container.png', copy: true
    },
    {
        contactType: 'Posizione', contactValue: 'Monza, Italia, IT', icon: 'assets/icons/location.png', copy: false
    },
]

export const LINKS: Link[] = [
    {
        linkType: 'Linkedin', linkValue: 'linkedin.com/alessio-fischetti', icon: 'assets/icons/linkedin.svg', actualLink: 'https://www.linkedin.com/in/alessio-fischetti-a085ab20a/'
    },
    {
        linkType: 'GitHub', linkValue: 'github.com/Alessio-Fischetti', icon: 'assets/icons/github.svg', actualLink: 'https://github.com/Alessio-Fischetti'
    },
    {
        linkType: 'Portfolio', linkValue: 'alessio-fischetti.github.io/Software-Developer-Portfolio', icon: 'assets/icons/online.png', actualLink: 'https://alessio-fischetti.github.io/Software-Developer-Portfolio'
    },
    {
        linkType: 'Medium', linkValue: 'medium.com/@afischetti.work', icon: 'assets/icons/medium.svg', actualLink: 'https://medium.com/@afischetti.work'
    },

]
