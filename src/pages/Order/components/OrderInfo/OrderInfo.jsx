import React from 'react';
import "./OrderInfo.scss";
import { MdSupportAgent, MdSearch, MdImportantDevices, MdHttps, MdSettingsEthernet, MdEmail } from "react-icons/md";
import SingleOrderInfo from './SingleOrderInfo';

const OrderInfo = () => {
    return (
        <div className="order-info py-5 container">
            <h2 className='py-4 section-heading'>Sayt Sifarişi</h2>
            <div className="row">
                <SingleOrderInfo svg={<MdSettingsEthernet />} title="Hazırlanan texnologiya" content="Saytınız ən yeni texnologiyalar ilə hazırlanır!" />
                <SingleOrderInfo svg={<MdSupportAgent />} title="24/7 Texniki dəstək" content="Saytı təhvil aldıqdan sonra hər hansı bir problemlə qarşılaşdığınızda kömək edirik!" />
                <SingleOrderInfo svg={<MdImportantDevices />} title="Saytınızın ölçüsü" content="Saytınızı bütün cihazlara uyğun formada hazırlayırıq!" />
                <SingleOrderInfo svg={<MdSearch />} title="Axtarışda görsənməsi" content="Saytınızın google axtarışlarında yuxarı sıralarda olmağına kömək edirik!" />
                <SingleOrderInfo svg={<MdHttps />} title="Domenin alınması" content="Saytınıza HTTPS protokollu domen almağa kömək edirik!" />
                <SingleOrderInfo svg={<MdEmail />} title="Korperativ mailin alınması" content="Saytınıza korporativ emailin alınmasına və aktivləşdirilməsinə kömək edirik!" />
            </div>
        </div>
    )
}

export default OrderInfo;