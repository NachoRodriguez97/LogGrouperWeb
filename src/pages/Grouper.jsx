import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { SelectPrinters } from './SelectPrinters'
import { MainMenu } from './MainMenu'
import { Grouping } from './Grouping'
import { Pallets } from './Pallets'
import { PalletDetail } from './PalletDetail'
import { ClosePallet } from './ClosePallet'
import { RemovePackage } from './RemovePackage'
import { Packing } from './Packing'
import { Diference } from './Diference'
import { PrintLabel } from './PrintLabel'
import { Reprint } from './Reprint'
import { ReprintPacking } from './ReprintPacking'
import { ReprintLabel } from './ReprintLabel'
import { ReprintRotulo } from './ReprintRotulo'
import { ReprintFinalLabel } from './ReprintFinalLabel'
import { CreatePallet } from './CreatePallet'
import { PalletsFilter } from './PalletsFilter'
import { GroupingImpo } from './GroupingImpo'
const Grouper = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/SelectPrinters" element={<SelectPrinters />}></Route>
                <Route path="/MainMenu" element={<MainMenu />}></Route>
                <Route path="/Grouping" element={<Grouping />}></Route>
                <Route path="/Pallets" element={<Pallets />}></Route>
                <Route path="/PalletDetail/:dropId/:group/:transport" element={<PalletDetail />}></Route>
                <Route path="/ClosePallet/:dropId/:group/:transport" element={<ClosePallet />}></Route>
                <Route path="/RemovePackage/:dropId/:group/:transport" element={<RemovePackage />}></Route>
                <Route path="/Packing/:dropId/:group/:transport" element={<Packing />}></Route>
                <Route path="/Diference/:dropId/:group/:transport" element={<Diference />}></Route>
                <Route path="/PrintLabel/:dropId/:group/:transport" element={<PrintLabel />}></Route>
                <Route path="/Reprint" element={<Reprint />}></Route>
                <Route path="/ReprintPacking" element={<ReprintPacking />}></Route>
                <Route path="/ReprintLabel" element={<ReprintLabel />}></Route>
                <Route path="/ReprintRotulo" element={<ReprintRotulo />}></Route>
                <Route path="/ReprintFinalLabel" element={<ReprintFinalLabel />}></Route>
                <Route path="/CreatePallet" element={<CreatePallet />}></Route>
                <Route path="/PalletsFilter" element={<PalletsFilter />}></Route>
                <Route path="/GroupingImpo" element={<GroupingImpo />}></Route>
            </Routes>
        </>
    )
}

export default Grouper;