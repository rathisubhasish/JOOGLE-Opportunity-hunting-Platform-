const addPost = async (postData) => {

    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/explore/addPost`, {
            method:"POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });
        return await res.json();

    } catch(err) {
        throw new Error(`Cannot add Post! ${err}`);
    }
};

module.exports = addPost;