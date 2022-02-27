import React, { useContext } from 'react';
import Toggle from 'react-toggle';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from '../context/ThemeContext';

import 'react-toggle/style.css';

export const ToggleModeNight = () => {
	const { theme, changeThemeContext } = useContext(ThemeContext);
	const handleChangeMode = (e) => {
		const themeValue = e.target.checked ? 'dark' : 'light';
		changeThemeContext(themeValue);
	};
	return (
		<div className="ToggleModeNight">
			{/*
				here We have to prevent render Toggle
				on the first render theme is undefined, so we do not want to
				render Toggle with defaultChecked={undefined}
				check the doc > https://www.npmjs.com/package/react-toggle
			 */}
			{ theme && (
				<Toggle
					id="mode"
					icons={{
						checked: (
							<FontAwesomeIcon icon={faMoon} className="fa faMoon" />
						),
						unchecked: (
							<FontAwesomeIcon icon={faSun} className="fa faSun" />
						),
					}}
					defaultChecked={theme === 'dark'}
					onChange={handleChangeMode}
				/>
			)}
		</div>
	);
};

ToggleModeNight.defaultProps = {
	mode: false,
};
