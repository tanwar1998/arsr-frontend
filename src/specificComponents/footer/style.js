import styled from 'styled-components';

export const FooterContainer = styled.div`
    background: #252525;
    color: #fff;

    .footer-content-main{
        display: grid;
        padding: 10px 0;
        width: 100%;
        float: none;
        box-sizing: border-box;
        grid-template-columns: 250px 250px auto;
        top: 0;
        margin: 40px auto;
        max-width: 1240px;
        padding: 0 20px;
        box-sizing: border-box;

        .call-icon{
            margin: -2px 7px -8px 0;
        }
        .basic-text-container{
            color: #888;
            font-size: 14px;    
                    
        }
        .number-text-container{
            text-align: left;
            margin: 20px 0;
            color: #888;
        }

        .social-icons-container{

            .icon-container{
                display: inline-block;
                float: left;
                border: 1px solid #aaa;
                padding: 4px 6px;
                color: #fff;
                margin-right: 10px;
                cursor: pointer;
                transition: all ease-in 0.3s;

                svg{
                    font-size: 20px;
                }

                &:hover{
                    border: 1px solid #FA4DAC;
                    color: #fff;
                    background: #FA4DAC;
                }
            }
        }

        .mail-text-container{

            .email-text{
                color: #999;
                font-size: 14px;

                span{
                    color: #aaa;
                    margin-right: 10px;
                }
            }
            a, a:hover{
                color: pink;
                color: #fa4dac;
                margin: 10px 0;
            }
        }
        .policy-content-main{
            text-align: right;
            font-size: 14px;
            color: #eee;
            line-height: 22px;

            a, a:hover{
                color: pink;
                color: #fa4dac;
            }
        }
    }

    @media only screen and (max-width: 768px){   
        .footer-content-main{
            grid-template-columns: auto;
            grid-gap: 30px;
        }
    }
`;