import { BtnBackTo } from "../components/BtnBackTo";
import { BtnMenu } from "../components/BtnMenu";
import { Title } from "../components/Title";
import { useEffect, useState } from "react";

export const Reprint = () => {

    const [settingsItems, setSettings] = useState([]);

    useEffect(() => {
        // Obtener settings desde localStorage
        const storedSettings = localStorage.getItem('Settings');
        const parsedSettings = storedSettings ? JSON.parse(storedSettings) : [];
        var filteredSettings = parsedSettings.filter(item => item.Module === 'Reimprimir');

        setSettings(filteredSettings);
    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className="row mt-3 justify-content-center">
                    <div className="col-md-6 mb-3 d-flex justify-content-center flex-column">
                        <Title title="Reimpresion" />
                        {settingsItems.map((settings, index) => (
                            <BtnMenu name={settings.Name} redirect={`/Grouper/${settings.Functionality}`} color= {index % 2 === 0 ? '#dc3545' : '#707070'} />
                        ))}
                    </div>
                    <div className='d-flex justify-content-center'>
                        <BtnBackTo redirect="/Grouper/MainMenu"></BtnBackTo>
                    </div>
                </div>
            </div>
        </>
    )
}
