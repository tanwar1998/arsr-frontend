import styled from 'styled-components';

export const DashboardContainer = styled.div`

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

        .table-container-main{
            margin: 70px 0;
        }
    }

    .info-container-main{
        span{
            font-weight: bold;
            margin-right: 10px;
        }
    }
    
`;


export const InfoContainer = styled.div`
    font-size: 14px;
    .hor-row{
        margin: 5px 0 ;
    }
    span{
        font-weight: bold;
        margin-right: 10px;
    }
`;