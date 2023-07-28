import React from 'react';

const CodeContent = ({ filteredContent }) => {
    return (
        <div className="code-content col-12 col-lg-10">
            <div style={{ wordWrap: 'break-word' }} className="p-3" dangerouslySetInnerHTML={{ __html: filteredContent?.content }} />
        </div>
    )
}

export default CodeContent;