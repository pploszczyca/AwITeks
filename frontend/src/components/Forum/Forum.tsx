import React from "react"
import { Row } from "react-bootstrap";
import { ContentContainer } from "../App/AppStyle";
import { ForumHeader, ForumCol, ForumTile, TableRow, OpenButton } from "./ForumStyles";



const variant = 'big';
const mockData = [  ['tytuł tematu 1', '7', 'username1', '2022-01-03'],
                    ['tytuł tematu 2', '14', 'username2', '2022-04-30'],
                    ['tytuł tematu 3', '9', 'username3', '2022-05-01']  ];
const headers = ['Tytuł tematu', 'Liczba odpowiedzi', 'Założyciel tematu', 'Data założenia tematu','Akcje'];
const COLS = Array.from(Array(headers.length).keys());
const ROWS = Array.from(Array(mockData.length).keys());

function getHeaderRow(){
    return(
        <TableRow>
            {headers.map(elem => (<ForumCol><ForumHeader>{elem}</ForumHeader></ForumCol>))}
        </TableRow>
    )
    }

function getTableElem(rowNum: number, colNum: number) {
    let data = mockData[rowNum][colNum];
    let last = (colNum === headers.length-1);
    return (
        last === false ? <ForumTile>{data}</ForumTile> : <ForumTile><OpenButton>Otwórz</OpenButton></ForumTile>
    )
}

const Forum: React.FC<{}> = () => {
    return (
        <ContentContainer>
            <Row className="mt-5">
                {/* <ForumTable>my text</ForumTable> */}
                <ForumCol xxl={variant === 'big' ? 9 : 12} >
                    {getHeaderRow()}
                    {ROWS.map(rowNum => (
                        <Row className="m-0" key={rowNum}>
                            {COLS.map(colNum => (
                                <ForumCol key={`${rowNum}.${colNum}`}>
                                    {getTableElem(rowNum, colNum)}
                                </ForumCol>
                            ))}
                        </Row>
                    ))}
                </ForumCol>
            </Row>
        </ContentContainer>
    )
};

export default Forum;