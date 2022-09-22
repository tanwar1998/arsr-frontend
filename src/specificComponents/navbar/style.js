import styled from 'styled-components';

export const NavigationBarContainer = styled.div`
    position: sticky;
    top: -1px;
    z-index: 2;
    background: #fff;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    text-align: center;

    .menu-button{
        float: right;
        font-size: 40px;
    }

`;


export const NavigationBarContent = styled.div`
    display: inline-block;
    float: none;
    max-width: 1240px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px 10px;
    box-sizing: border-box;    
    position: relative;


    .close-icon{
        position: absolute;
        position: absolute;
        right: 20px;
        z-index: 3;
        top: 20px;
    }

    .nav-content-main, .mobile-nav-bar{
        display: grid;
        padding: 8px 20px 0px;
        width: 100%;
        float: none;
        box-sizing: border-box;
        grid-template-columns: 200px auto;
        top: 0;
        max-width: 1240px;
        box-sizing: border-box;
    }

    .logo-container{
        img{
            max-width: 140px;
            width: calc(100% - 35px);
            float: left;
        }
    }

    .nav-item-container{
        text-align: right;

        .nav-item{
            display: inline-block;
            transition: all ease-in 0.3s;
            padding: 10px 10px 5px;
            color: #000;
            font-weight: 600;
            position: relative;
            cursor: pointer;
            font-size: 14px;
            line-height: 40px;
            transition: all ease-in 0.3s;

            .nav-hover-content{
                background: #FA4DAC;
                color: #fff;
                border-radius: 3px;
                position: absolute;
                text-align: left;
                color: #fff;
                padding: 0;
                width: calc(100% + 20px);
                top: 60px;
                display: none;

                .pointer-icon{
                    position: absolute;
                    top: -10px;
                    left: 20px;
                    height: 20px;
                    width: 20px;                
                    transform: rotate(45deg);
                    background: #FA4DAC;
                }
                .nav-label{
                    line-height: 20px;
                    z-index: 2;
                    padding: 6px 5px 6px 12px;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all ease-in 0.3s;

                    &:hover{
                        background: #d73d92;
                    }
                }
            }

            &:hover{
                color: #FA4DAC;

                .nav-hover-content{
                    display: block;

                }
            }
        }
    }

    .mobile-block{
        display: none;
    }

    @media only screen and (max-width: 768px){ 
        .nav-content-main {
            padding: 5px 0 0;

            .subitem-container-nav:hover{
                color: inherit;
            }
        }
        .mobile-block{
            display: block;    

            .nav-item-container{
                text-align: left;

                .nav-hover-content{
                    display: block;
                    position: relative;
                    color: #333;
                    top: 5px;

                    .pointer-icon{
                        display: none;
                    }
                    .nav-label:hover{
                        background: #fff;
                        color: #FA4DAC;
                        
                    }
                }
        
                .nav-item{
                    width: 100%;
                    box-sizing: border-box;
                    line-height: 20px;
                }
            }
        }
        .desktop-block{
            display: none;
        }
    }

`;