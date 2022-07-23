
const EmptyResult = ({message, onEmptyButtonClicked, emptyButtonText}) => {

    return <div className="empyResultHolder">
        <div className="emptyResultInnerContent">
            <h5 style={{textAlign: "center", marginBottom: "8px"}}>
                {
                    message ? message : "No content was found"
                }
            </h5>
            <button className="rectangleButtonSecondary" onClick={e => onEmptyButtonClicked(e)}>{emptyButtonText ? emptyButtonText : "Try Again"}</button>
        </div>
    </div>
}

export default EmptyResult;