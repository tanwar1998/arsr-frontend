import styled from 'styled-components';

export const AboutContainer = styled.div`

    width: 100%;
    text-align: center;
    float: left;
    background: #dfdfdf;

    .home-container-main{
        text-align: center;

        h2{
            text-align: left;
            margin-top: -20px;
        }

        .tabs-container-main{
            text-align: left;

            .tab-item{
                display: inline-block;
                border: 1px solid #fa4dac;
                color: #fa4dac;
                margin: 5px;
                padding: 8px 12px;
                font-size: 14px;
                border-radius: 3px;
                cursor: pointer;
                transition: all ease-in 0.3s;

                &:hover{
                    background: #fa4dac;
                    color: #fff;
                }
            }
            .selected-tab{
                background: #fa4dac;
                color: #fff;
            }

        }
        .table-container-main{
            margin: 70px 0;
        }
    }

    
    @media only screen and (max-width: 576px){
    }
    
`;