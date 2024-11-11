import React, {useState} from 'react';

const SizeChart = () => {

    const [isWomenVisible, setIsWomenVisible] = useState(false);
    const [isMenVisible, setIsMenVisible] = useState(false);
    const toggleWomenVisibility = () => {
        setIsWomenVisible(!isWomenVisible);
    };

    const toggleMenVisibility = () => {
        setIsMenVisible(!isMenVisible);
    };
    return (
        <div>
            {/* Розмірна сітка для жінок */}
            <h2 onClick={toggleWomenVisibility} style={{cursor: 'pointer'}}>
                Розмірна сітка для жінок {isWomenVisible ? '▲' : '▼'}
            </h2>
            {isWomenVisible && (
                <table className='table-auto w-full mt-2'>
                    <thead>
                    <tr>
                        <th>Тип одягу</th>
                        <th>Розмір (UA)</th>
                        <th>Груди (см)</th>
                        <th>Талія (см)</th>
                        <th>Стегна (см)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Верхній одяг</td>
                        <td>42 (XS)</td>
                        <td>84-88</td>
                        <td>64-68</td>
                        <td>88-92</td>
                    </tr>
                    <tr>
                        <td>Верхній одяг</td>
                        <td>44 (S)</td>
                        <td>88-92</td>
                        <td>68-72</td>
                        <td>92-96</td>
                    </tr>
                    <tr>
                        <td>Верхній одяг</td>
                        <td>46 (M)</td>
                        <td>92-96</td>
                        <td>72-76</td>
                        <td>96-100</td>
                    </tr>
                    <tr>
                        <td>Верхній одяг</td>
                        <td>48 (L)</td>
                        <td>96-100</td>
                        <td>76-80</td>
                        <td>100-104</td>
                    </tr>
                    <tr>
                        <td>Нижній одяг</td>
                        <td>42 (XS)</td>
                        <td>84-88</td>
                        <td>64-68</td>
                        <td>88-92</td>
                    </tr>
                    <tr>
                        <td>Нижній одяг</td>
                        <td>44 (S)</td>
                        <td>88-92</td>
                        <td>68-72</td>
                        <td>92-96</td>
                    </tr>
                    <tr>
                        <td>Нижній одяг</td>
                        <td>46 (M)</td>
                        <td>92-96</td>
                        <td>72-76</td>
                        <td>96-100</td>
                    </tr>
                    <tr>
                        <td>Нижній одяг</td>
                        <td>48 (L)</td>
                        <td>96-100</td>
                        <td>76-80</td>
                        <td>100-104</td>
                    </tr>
                    <tr>
                        <td>Взуття</td>
                        <td>36</td>
                        <td>-</td>
                        <td>-</td>
                        <td>23 см (довжина стопи)</td>
                    </tr>
                    <tr>
                        <td>Взуття</td>
                        <td>37</td>
                        <td>-</td>
                        <td>-</td>
                        <td>24 см (довжина стопи)</td>
                    </tr>
                    <tr>
                        <td>Взуття</td>
                        <td>38</td>
                        <td>-</td>
                        <td>-</td>
                        <td>24.5 см (довжина стопи)</td>
                    </tr>
                    <tr>
                        <td>Взуття</td>
                        <td>39</td>
                        <td>-</td>
                        <td>-</td>
                        <td>25 см (довжина стопи)</td>
                    </tr>
                    <tr>
                        <td>Взуття</td>
                        <td>40</td>
                        <td>-</td>
                        <td>-</td>
                        <td>25.5 см (довжина стопи)</td>
                    </tr>
                    </tbody>
                </table>
            )}

            {/* Розмірна сітка для чоловіків */}
            <h2 onClick={toggleMenVisibility} style={{cursor: 'pointer'}}>
                Розмірна сітка для чоловіків {isMenVisible ? '▲' : '▼'}
            </h2>
            {isMenVisible && (
                <table className='table-auto w-full mt-2'>
                    <thead>
                    <tr>
                        <th>Тип одягу</th>
                        <th>Розмір (UA)</th>
                        <th>Груди (см)</th>
                        <th>Талія (см)</th>
                        <th>Стегна (см)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Верхній одяг</td>
                        <td>46 (S)</td>
                        <td>92-96</td>
                        <td>80-84</td>
                        <td>96-100</td>
                    </tr>
                    <tr>
                        <td>Верхній одяг</td>
                        <td>48 (M)</td>
                        <td>96-100</td>
                        <td>84-88</td>
                        <td>100-104</td>
                    </tr>
                    <tr>
                        <td>Верхній одяг</td>
                        <td>50 (L)</td>
                        <td>100-104</td>
                        <td>88-92</td>
                        <td>104-108</td>
                    </tr>
                    <tr>
                        <td>Верхній одяг</td>
                        <td>52 (XL)</td>
                        <td>104-108</td>
                        <td>92-96</td>
                        <td>108-112</td>
                    </tr>
                    <tr>
                        <td>Нижній одяг</td>
                        <td>46 (S)</td>
                        <td>92-96</td>
                        <td>80-84</td>
                        <td>96-100</td>
                    </tr>
                    <tr>
                        <td>Нижній одяг</td>
                        <td>48 (M)</td>
                        <td>96-100</td>
                        <td>84-88</td>
                        <td>100-104</td>
                    </tr>
                    <tr>
                        <td>Нижній одяг</td>
                        <td>50 (L)</td>
                        <td>100-104</td>
                        <td>88-92</td>
                        <td>104-108</td>
                    </tr>
                    <tr>
                        <td>Нижній одяг</td>
                        <td>52 (XL)</td>
                        <td>104-108</td>
                        <td>92-96</td>
                        <td>108-112</td>
                    </tr>
                    <tr>
                        <td>Взуття</td>
                        <td>41</td>
                        <td>-</td>
                        <td>-</td>
                        <td>26.5 см (довжина стопи)</td>
                    </tr>
                    <tr>
                        <td>Взуття</td>
                        <td>42</td>
                        <td>-</td>
                        <td>-</td>
                        <td>27 см (довжина стопи)</td>
                    </tr>
                    <tr>
                        <td>Взуття</td>
                        <td>43</td>
                        <td>-</td>
                        <td>-</td>
                        <td>28 см (довжина стопи)</td>
                    </tr>
                    <tr>
                        <td>Взуття</td>
                        <td>44</td>
                        <td>-</td>
                        <td>-</td>
                        <td>28.5 см (довжина стопи)</td>
                    </tr>
                    <tr>
                        <td>Взуття</td>
                        <td>45</td>
                        <td>-</td>
                        <td>-</td>
                        <td>29 см (довжина стопи)</td>
                    </tr>
                    <tr>
                        <td>Взуття</td>
                        <td>46</td>
                        <td>-</td>
                        <td>-</td>
                        <td>29.5 см (довжина стопи)</td>
                    </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SizeChart;