import React from 'react'

class Books extends React.Component {

    render() {
        return (
            <div className="books">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128, height: 188,
                        backgroundImage: `url(${this.props.thumb})`
                    }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select 
                            value={this.props.shelf||"none"}
                            onChange={(e) => this.props.moveBook(this.props.book, e.target.value)}
                            >
                            <option disabled>Move to..</option>
                            <option value="currentlyReading">Currently reading</option>
                            <option value="wantToRead">Want to read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.authors}</div>
            </div>

        )
    }
}

export default Books