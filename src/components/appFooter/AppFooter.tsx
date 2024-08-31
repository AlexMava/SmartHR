const AppFooter = () => {
    const d = new Date();
    let year = d.getFullYear();
    return (
        <footer className='footer'>
            <div className="container">
                <div className="row">
                    <p>©{year} SmartHR Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default AppFooter;