


export const getHeader = (JWT_TOKEN: string): Headers => {
    let header = new Headers();

    header.append("Jwt", JWT_TOKEN);

    header.append("Content-type", "application/json");
    // console.log(header)
    return header;

}
